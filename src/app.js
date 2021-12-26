const {
  getLinkFromCustomHash,
  getLinkFromHashID,
  insertLink,
  updateClicks,
  updateCustomHashClicks,
  updateCustomId,
  getLink,
} = require("./queries.js");

const Hashids = require("hashids");
const apolloClient = require("apollo-client");
const apolloHttpLink = require("apollo-link-http");
const apolloInMemoryCache = require("apollo-cache-inmemory");
const corsPlugin = require("fastify-cors");
const dotenv = require("dotenv");
const fastify = require("fastify");
const fetch = require("node-fetch");
const uuidv4 = require("uuid").v4;
const pino = require("pino");
const redisClient = require("redis");
const logger = pino({
  // transport: {
  //   target: "pino-pretty",
  //   options: {
  //     colorize: true,
  //   },
  // },
});

const ApolloClient = apolloClient.ApolloClient;
const HttpLink = apolloHttpLink.HttpLink;
const InMemoryCache = apolloInMemoryCache.InMemoryCache;

const hashids = new Hashids();
dotenv.config();
var context = require("rabbit.js").createContext(process.env.RABBITMQ_URL);

const BASE_URL = `http://localhost:8888`;

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${process.env.HASURA_URL}`,
    fetch: fetch,
    headers: {
      "x-hasura-admin-secret": `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`,
    },
  }),
  cache: new InMemoryCache({ addTypename: false }),
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

const startApp = function () {
  context.on("ready", async function () {
    const cacheClient = redisClient.createClient({
      url: "redis://localhost:6381",
    });

    cacheClient.on("error", (err) => console.log("Redis Client Error", err));

    let pub = context.socket("PUBLISH");
    let sub = context.socket("SUBSCRIBE");
    sub.setEncoding("utf8");
    sub.connect("click-counter-update", function () {
      sub.on("data", async function (note) {
        await cacheClient.incr(JSON.parse(note).id);
        // await updateCustomHashClicks(client, {
        //   id: JSON.parse(note).id,
        // });
      });

      pub.connect("click-counter-update", function () {
        let serverBaseUrl;
        if (process.env.SERVER_BASE_URL) {
          logger.info(
            "The current base url is :: " + process.env.SERVER_BASE_URL
          );
          serverBaseUrl = process.env.SERVER_BASE_URL;
        } else {
          console.log.error("ENV must include SERVER_BASE_URL");
        }
        const server = fastify({
          logger: false,
        });

        server.register(corsPlugin, {
          origin: (origin, cb) => {
            cb(null, true);
          },
          exposedHeaders: ["X-Total-Count"],
        });
        server.listen(
          process.env.SERVER_PORT,
          "0.0.0.0",
          function (err, address) {
            if (err) {
              server.log.error(err);
              process.exit(1);
            }
            server.log.info(`server listening on ${address}`);
          }
        );

        // Home page
        server.route({
          method: "GET",
          url: "/",
          handler: function (request, reply) {
            reply.send("HOME PAGE for YAUS");
          },
        });

        // Redirect to Long URL BASE_URL/abc123 => https://www.google.com
        server.route({
          method: "GET",
          url: "/sr/:code",
          handler: async function (request, reply) {
            if (!request.params.code) {
              return reply.redirect(BASE_URL);
            }
            let hashid = hashids.decode(request.params.code)[0];
            if (!hashid) hashid = -1;
            let redirectURL = await getLink(client, {
              hashid,
              customHashId: request.params.code,
            });
            if (redirectURL.link.length === 0) {
              reply
                .code(404)
                .header("Content-Type", "application/json; charset=utf-8")
                .send({ error: "Could not find URL with hashID" });
            } else {
              await cacheClient.incr(redirectURL.link[0].id);
              return reply.redirect(redirectURL.link[0].url);
            }
          },
        });

        // Get URL form a HashID
        server.route({
          method: "GET",
          url: "/sr/getURL/:hashId",
          handler: async function (request, reply) {
            request.log.info("Params", request.params);
            const hashid = parseInt(request.params.hashId);
            const returnings = await getLinkFromHashID(client, { hashid });
            if (returnings.link.length !== 0) {
              let url = "";
              if (returnings.link[0].customHashId !== null) {
                url = `${serverBaseUrl}/sr/${returnings.link[0].customHashId}`;
              } else {
                url = `${serverBaseUrl}/sr/${hashids.encode(
                  returnings.link[0].hashid
                )}`;
              }
              reply
                .code(200)
                .header("Content-Type", "application/json; charset=utf-8")
                .send({
                  error: null,
                  url: url,
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
          url: "/sr/addURL",
          handler: async function (request, reply) {
            const uuid = uuidv4();
            request.log.info(request.body);

            return insertLink(client, request.body)
              .then((DBres) => {
                const returnings = DBres.data.insert_link.returning;

                if (returnings) {
                  let url = "";
                  if (returnings[0].customHashId !== null) {
                    url = `${serverBaseUrl}/sr/${returnings[0].customHashId}`;
                  } else {
                    url = `${serverBaseUrl}/sr/${hashids.encode(
                      returnings[0].hashid
                    )}`;
                  }
                  reply
                    .code(200)
                    .header("Content-Type", "application/json; charset=utf-8")
                    .send({
                      error: null,
                      res: returnings[0],
                      shortUrl: url,
                    });
                } else {
                  reply
                    .code(500)
                    .header("Content-Type", "application/json; charset=utf-8")
                    .send({ error: "Could not find URL with hashID" });
                }
              })
              .catch((e) => {
                request.log.error(e);
                reply
                  .code(500)
                  .header("Content-Type", "application/json; charset=utf-8")
                  .send({ error: e.message });
              });
          },
        });

        server.route({
          method: "PUT",
          url: "/sr/customHash/:hashId",
          handler: async function (request, reply) {
            request.log.info("Params", request.params);
            const hashid = parseInt(request.params.hashId);
            const customhash = request.body.customhash;
            const DBres = await updateCustomId(client, { hashid, customhash });
            request.log.info("DBres:", DBres.length);

            if (DBres.length !== 0) {
              request.log.info("Entered ");
              reply
                .code(200)
                .header("Content-Type", "application/json; charset=utf-8")
                .send({
                  error: null,
                  res: DBres,
                  shortUrl: `${serverBaseUrl}/sr/${DBres[0].customHashId}`,
                });
            } else {
              reply
                .code(404)
                .header("Content-Type", "application/json; charset=utf-8")
                .send({ error: "Could not find URL with hashID" });
            }
          },
        });
      });
    });
  });
};

startApp();
