  import {
    getLastLink,
    getLinkFromHashID,
    getTemplateFromID,
    getUniqueLinkID,
    insertLink,
    updateClicks,
    updateCustomHashClicks,
    updateCustomId,
    getLinkFromCustomHash,
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
  import { v4 as uuidv4 } from 'uuid';
  

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
    server.listen(8888, "0.0.0.0", function (err, address) {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }
      server.log.info(`server listening on ${address}`);
    });
    // server.listen(8888);

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
 
        let redirectURL = await getLinkFromHashID(client, { hashid });
        
        if(redirectURL === undefined){
          console.log("Enterred Custom")
          const customHashId = request.params.code
          console.log("Custom",customHashId)
          redirectURL = await getLinkFromCustomHash(client, {customHashId});
          await updateCustomHashClicks(client, { customHashId });
          return reply.redirect(redirectURL.link[0].url);
        } else if (redirectURL) {
          await updateClicks(client, { hashid });
          return reply.redirect(redirectURL.link[0].url);
        } else {
          reply
            .code(404)
            .header("Content-Type", "application/json; charset=utf-8")
            .send({ error: "Could not find URL with hashID" });
        }
      },
    });

    // Get URL form a HashID
    server.route({
      method: "GET",
      url: "/sr/getURL/:hashId",
      handler: async function (request, reply) {
        console.log("Params", request.params);
        const hashid = parseInt(request.params.hashId);
        const returnings = await getLinkFromHashID(client, { hashid });
        if ((returnings.link).length !== 0) {
          let url = ''
          if(returnings.link[0].customHashId !== null){
            url = `${config.serverBaseUrl}/sr/${returnings.link[0].customHashId }`
          }
          else{
            url = `${config.serverBaseUrl}/sr/${hashids.encode(returnings.link[0].hashid)}`
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
        const uuid = uuidv4()
      
        const DBres = await insertLink(client,request.body)
        const returnings = DBres.data.insert_link.returning

        if (returnings) {
          let url = ''
          if(returnings[0].customHashId !== null){
            url = `${config.serverBaseUrl}/sr/${returnings[0].customHashId }`
          }
          else{
            url = `${config.serverBaseUrl}/sr/${hashids.encode(returnings[0].hashid)}`
          }
          reply
            .code(200)
            .header("Content-Type", "application/json; charset=utf-8")
            .send({
              error: null,
              res:returnings[0],
              shortUrl:url ,
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
      method: "PUT",
      url: "/sr/customHash/:hashId",
      handler: async function (request, reply) {
        console.log("Params", request.params);
        const hashid = parseInt(request.params.hashId);
        const customhash = request.body.customhash
        const DBres = await updateCustomId(client, { hashid,customhash });
        console.log("DBres:",DBres.length)

        if (DBres.length !== 0) {
          
          console.log("Entered ")
          reply
            .code(200)
            .header("Content-Type", "application/json; charset=utf-8")
            .send({
              error: null,
              res:DBres,
              shortUrl: `${config.serverBaseUrl}/sr/${DBres[0].customHashId}`,
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
