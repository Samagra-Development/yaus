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

const BASE_URL = "http://localhost:8888"

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

  // Get URL for a HashID
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
};

startApp();
