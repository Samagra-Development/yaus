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
};

startApp();
