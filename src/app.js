import {
  getLastLink,
  getLinkFromHashID,
  getTemplateFromID,
  getUniqueLinkID,
  insertLink,
  updateClicks,
} from "./queries.js";

import Hashids from "hashids";
import apolloClient from "apollo-client";
import apolloHttpLink from "apollo-link-http";
import apolloInMemoryCache from "apollo-cache-inmemory";
import config from "config";
import { default as corsPlugin } from "fastify-cors";
import dotenv from "dotenv";
import fastify from "fastify";
import fetch from "node-fetch";
import { default as fusionauthClient } from "@fusionauth/node-client";
import gql from "graphql-tag";

const { FusionAuthClient } = fusionauthClient;
const { ApolloClient } = apolloClient;
const { HttpLink } = apolloHttpLink;
const { InMemoryCache } = apolloInMemoryCache;

const hashids = new Hashids();
dotenv.config();

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${process.env.HASURA_URL}`,
    fetch: fetch,
    headers: {
      "x-hasura-admin-secret": `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`,
    },
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

const serverBaseUrl = config.serverBaseUrl + "/{code}";
console.log(serverBaseUrl);
const server = fastify({
  logger: true,
});
server.register(corsPlugin, {
  origin: (origin, cb) => {
    cb(null, true);
  },
  exposedHeaders: ["X-Total-Count"],
});

const startApp = function () {
  server.listen(config.port, "0.0.0.0", function (err, address) {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    server.log.info(`server listening on ${address}`);
  });

  server.route({
    method: "GET",
    url: "/",
    handler: function (request, reply) {
      reply.redirect("https://x.samgragovernance.in");
    },
  });

  server.route({
    method: "POST",
    handler: function (request, reply) {
      url: "/transformer/pass", console.log(request.body);
      reply.send({ data: request.body.data });
    },
  });

  server.route({
    method: "GET",
    url: "/sr/:code",
    handler: async function (request, reply) {
      if (!request.params.code) {
        return reply.redirect("https://x.samgragovernance.in");
      }
      const hashid = hashids.decode(request.params.code)[0];
      const redirectURL = await getLinkFromHashID(client, { hashid });
      if (redirectURL) {
        await updateClicks(client, { hashid });
        return reply.redirect(redirectURL);
      } else {
        reply
          .code(404)
          .header("Content-Type", "application/json; charset=utf-8")
          .send({ error: "Could not find URL with hashID" });
      }
    },
  });

  server.route({
    method: "GET",
    url: "/sr/getURL/:hashId",
    handler: async function (request, reply) {
      console.log("Params", request.params);
      const hashid = parseInt(request.params.hashId);
      const hashidEncoded = hashids.encode(hashid);
      console.log({ hashidEncoded });
      if (hashidEncoded) {
        reply
          .code(200)
          .header("Content-Type", "application/json; charset=utf-8")
          .send({
            error: null,
            url: `${config.serverBaseUrl}/sr/${hashidEncoded}`,
          });
      } else {
        reply
          .code(404)
          .header("Content-Type", "application/json; charset=utf-8")
          .send({ error: "Could not find URL with hashID" });
      }
    },
  });

  server.route({
    method: "POST",
    url: "/sr/addByUser",
    handler: async function (request, reply) {
      if (!request.body.userID && !request.body.phone) {
        return reply
          .code(404)
          .header("Content-Type", "application/json; charset=utf-8")
          .send({ error: "Not a valid user" });
      } else {
        let userID = request.body.userID;
        const groupID = request.body.group;
        const templateID = request.body.template;
        const phoneNo = request.body.phone;
        const project = request.body.project;
        const applicationID = request.body.applicationID;
        const authServer = request.body.authServer;

        const faClient = new FusionAuthClient(
          config.authServer[authServer].key,
          config.authServer[authServer].service
        );

        console.log(config.authServer[authServer]);
        if (userID) {
          faClient
            .retrieveUserByVerificationId(userID)
            .then((res) => {
              console.log(res);
            })
            .then((s) => {
              reply
                .code(404)
                .header("Content-Type", "application/json; charset=utf-8")
                .send({ error: null });
            });
        } else {
          const { user, error } = {
            ...(await getUserByPhoneNo(
              faClient,
              phoneNo,
              groupID,
              applicationID
            )),
          };
          const template = (await getTemplateFromID(client, { templateID }))
            .data.template[0].text;
          try {
            const url = interpolate(
              template.substring(1, template.length - 1),
              { user }
            );
            insertLink(client, {
              url,
              userID: user.id,
              project,
            })
              .then((res) => {
                console.log(res);
                return reply
                  .code(200)
                  .header("Content-Type", "application/json; charset=utf-8")
                  .send({ error: null, res });
              })
              .catch((e) => {
                console.log(e);
                return reply
                  .code(404)
                  .header("Content-Type", "application/json; charset=utf-8")
                  .send({ error: e.message, res: null });
              });
          } catch (e) {
            console.log(e);
            if (e instanceof TypeError) {
              return reply
                .code(404)
                .header("Content-Type", "application/json; charset=utf-8")
                .send({ error: "Not a valid user" });
            } else {
              return reply
                .code(404)
                .header("Content-Type", "application/json; charset=utf-8")
                .send({ error: "Not a valid template" });
            }
          }
        }
      }
    },
  });

  server.route({
    method: "POST",
    url: "/template/eval",
    handler: async function (request, reply) {
      try {
        const templateID = request.body.template;
        const dataObjName = request.body.dataObjName;
        const dataObj = request.body[dataObjName];
        const result = await evaluateTemplate(templateID, dataObjName, dataObj);
        return reply
          .code(200)
          .header("Content-Type", "application/json; charset=utf-8")
          .send({ result });
      } catch (e) {
        return reply
          .code(404)
          .header("Content-Type", "application/json; charset=utf-8")
          .send({ error: e.message });
      }
    },
  });

  // Get users for application ID
  server.route({
    method: "POST",
    url: "/users",
    handler: async function (request, reply) {
      try {
        const applicationID = request.body.application;
        const faClientComms = new FusionAuthClient(
          config.authServer.comms.key,
          config.authServer.comms.service
        );

        const { application, error } = {
          ...(await getApplicationByID(faClientComms, applicationID)),
        };

        const userQuery = application.data.users.service.config.gql;
        const server = application.data.users.service.config.variable2;
        console.log(userQuery);
        const clt = new ApolloClient({
          link: new HttpLink({
            uri: config.authServer[server].service,
            fetch: fetch,
            headers: config.authServer[server].headers,
          }),
          cache: new InMemoryCache(),
        });
        clt
          .query({
            query: gql`
              ${userQuery}
            `,
          })
          .then((resp) => {
            console.log(resp);
            if ("profile" in resp.data.users[0]) {
              const users = resp.data.users
                .filter((user) => user.profile)
                .filter((user) => user.profile.data)
                .filter((user) => user.profile.data.phone)
                .map((user) => user.profile.data.phone);
              return {
                total: users.length,
                users,
              };
            } else {
              const users = resp.data.users
                .filter((user) => user.mobilePhone)
                .map((user) => user.mobilePhone);
              return {
                total: users.length,
                users,
              };
            }
          })
          .then((r) => {
            return reply
              .code(200)
              .header("Content-Type", "application/json; charset=utf-8")
              .send(r);
          })
          .catch((e) => {
            console.log(e);
            return reply
              .code(404)
              .header("Content-Type", "application/json; charset=utf-8")
              .send({ error: e.message });
          });
      } catch (e) {
        console.log(e);
        return reply
          .code(404)
          .header("Content-Type", "application/json; charset=utf-8")
          .send({ error: e.message });
      }
    },
  });

  // Get users for application ID
  server.route({
    method: "POST",
    url: "/usersWithTemplate",
    handler: async function (request, reply) {
      try {
        const applicationID = request.body.application;
        const faClientComms = new FusionAuthClient(
          config.authServer.comms.key,
          config.authServer.comms.service
        );

        const { application, error } = {
          ...(await getApplicationByID(faClientComms, applicationID)),
        };

        const userQuery = application.data.users.service.config.gql;
        const server = application.data.users.service.config.variable2;
        console.log(userQuery);
        const clt = new ApolloClient({
          link: new HttpLink({
            uri: config.authServer[server].service,
            fetch: fetch,
            headers: config.authServer[server].headers,
          }),
          cache: new InMemoryCache(),
        });
        clt
          .query({
            query: gql`
              ${userQuery}
            `,
          })
          .then(async (resp) => {
            console.log(resp);
            if ("profile" in resp.data.users[0]) {
              const users = resp.data.users
                .filter((user) => user.profile)
                .filter((user) => user.profile.data)
                .filter((user) => user.profile.data.phone)
                .map((user) => user.profile.data.phone);
              return {
                total: users.length,
                users,
              };
            } else {
              const templateID = application.data.parts[0].template;
              const template = (await getTemplateFromID(client, { templateID }))
                .data.template[0].text;

              const users = resp.data.users
                .filter((user) => user.mobilePhone)
                .map((user) => {
                  return {
                    phone: user.mobilePhone,
                    message: interpolate(
                      template.substring(1, template.length - 1),
                      {
                        user: user,
                      }
                    ),
                  };
                });
              return {
                total: users.length,
                users,
              };
            }
          })
          .then((r) => {
            return reply
              .code(200)
              .header("Content-Type", "application/json; charset=utf-8")
              .send(r);
          })
          .catch((e) => {
            console.log(e);
            return reply
              .code(404)
              .header("Content-Type", "application/json; charset=utf-8")
              .send({ error: e.message });
          });
      } catch (e) {
        console.log(e);
        return reply
          .code(404)
          .header("Content-Type", "application/json; charset=utf-8")
          .send({ error: e.message });
      }
    },
  });

  server.route({
    method: "POST",
    url: "/user/eval",
    handler: async function (request, reply) {
      try {
        const commsApplicationID = request.body.applicationID;
        const userID = request.body.userID;
        const phone = request.body.phone;

        console.log(request.body);

        const faClientComms = new FusionAuthClient(
          config.authServer.comms.key,
          config.authServer.comms.service
        );

        const { application, error } = {
          ...(await getApplicationByID(faClientComms, commsApplicationID)),
        };
        console.log(application.data);
        const faClient = new FusionAuthClient(
          config.authServer[application.data.users.service.config.variable].key,
          config.authServer[
            application.data.users.service.config.variable
          ].service
        );

        let user, err;
        if (!error) {
          if (phone) {
            const userData = await getUserByPhoneNo(
              faClient,
              phone,
              null,
              null
            );
            user = userData.user;
            err = userData.error;
          } else {
            const userData = await getUserByID(faClient, userID);
            user = userData.user;
            err = userData.error;
          }
          if (!err) {
            const data = await Promise.all(
              application.data.parts[0].meta.hiddenFields.map(async (hf) => {
                let evaluated;
                if (hf.type === "url-shortner") {
                  const url = await evaluateTemplate(
                    hf.config.template,
                    hf.config.dataObjName,
                    user
                  );
                  evaluated = await insertLink(client, {
                    url,
                    userID: user.id,
                    project: commsApplicationID,
                  })
                    .then((res) => {
                      res.url =
                        config.serverBaseUrl +
                        "/sr/" +
                        hashids.encode(res.hashid);
                    })
                    .catch(async (e) => {
                      if (e.message.includes("Uniqueness")) {
                        return (
                          config.serverBaseUrl +
                          "/sr/" +
                          hashids.encode(
                            await getUniqueLinkID(client, {
                              url,
                              user: user.id,
                              project: commsApplicationID,
                            })
                          )
                        );
                      } else return "";
                    });
                } else {
                  evaluated = await evaluateTemplate(
                    hf.config.template,
                    hf.config.dataObjName,
                    user
                  );
                }

                return {
                  field: hf.name,
                  evaluated,
                };
              })
            );
            return reply
              .code(200)
              .header("Content-Type", "application/json; charset=utf-8")
              .send({ data });
          }
        } else {
          return reply
            .code(404)
            .header("Content-Type", "application/json; charset=utf-8")
            .send({ error: "Application not found" });
        }
      } catch (e) {
        console.log(e);
        return reply
          .code(404)
          .header("Content-Type", "application/json; charset=utf-8")
          .send({ error: e.message });
      }
    },
  });
};

const getApplicationByID = (faClient, applicationID) => {
  return faClient
    .retrieveApplication(applicationID)
    .then((response) => {
      if (response.statusCode === 200) {
        return {
          application: response.successResponse.application,
          error: null,
        };
      } else {
        const error = new Error("Application with ID not found");
        return { application: null, error };
      }
    })
    .catch((error) => {
      return { application: null, error };
    });
};

async function evaluateTemplate(templateID, dataObjName, dataObj) {
  const template = (await getTemplateFromID(client, { templateID })).data
    .template[0].text;
  const result = interpolate(template.substring(1, template.length - 1), {
    [dataObjName]: dataObj,
  });
  return result;
}

function getUserByPhoneNo(faClient, phoneNo, groupID, applicationID) {
  let queryString;
  if (groupID) {
    queryString = `(mobilePhone: ${phoneNo}) AND (memberships.groupId: ${groupID})`;
  } else if (!applicationID) {
    queryString = `(mobilePhone: ${phoneNo})`;
  } else {
    queryString = `(mobilePhone: ${phoneNo}) AND (registrations.applicationId: ${applicationID})`;
  }
  const searchRequestWithPhoneNo = {
    search: {
      queryString,
      sortFields: [
        {
          name: "email",
        },
      ],
    },
  };
  return faClient
    .searchUsersByQuery(searchRequestWithPhoneNo)
    .then((response) => {
      if (response.statusCode === 200) {
        if (response.successResponse.total >= 1) {
          return { user: response.successResponse.users[0], error: null };
          // } else if (response.successResponse.total >= 1) {
          //   const error = new Error("More than one user found");
          //   return { user: null, error };
        } else {
          const error = new Error("No users found");
          return { user: null, error };
        }
      } else {
        const error = new Error("Auth service returned an unexpected response");
        return { user: null, error };
      }
    })
    .catch((error) => {
      return { user: null, error };
    });
}

function getUserByID(faClient, userID) {
  return faClient
    .retrieveUserByLoginId(userID)
    .then((response) => {
      if (response.statusCode === 200) {
        return { user: response.successResponse.users, error: null };
      } else {
        const error = new Error("Auth service returned an unexpected response");
        return { user: null, error };
      }
    })
    .catch((error) => {
      return { user: null, error };
    });
}

export default function interpolate(template, variables, fallback) {
  const regex = /\${[^{]+}/g;
  return template.replace(regex, (match) => {
    const path = match.slice(2, -1).trim();
    return getObjPath(path, variables, fallback);
  });
}

//get the specified property or nested property of an object
function getObjPath(path, obj, fallback = "") {
  return path.split(".").reduce((res, key) => res[key] || fallback, obj);
}

startApp();
