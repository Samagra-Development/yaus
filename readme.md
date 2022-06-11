### Setting Up Backend

```shell
cd apps/api
unzip pgdata.zip
docker-compose up -d shortdb gql yaus-broker shortnr-cache
npx nx serve api
```

### Setting up Frontend

```shell
npx nx server admin
```

### Try It
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Samagra-Development/yaus/tree/gitpod)

### TODO
- [x] Migrate to Fastify
- [x] Add all the routes that are not yet implemented
- [x] Prisma Schema Setup
- [x] Posthog integration -- (Discuss and add events)
- [x] Health Check APIs (https://docs.nestjs.com/recipes/terminus) -- (Add for Db, Hasura, Redis, RabbitMq)
- [] Admin APIs
- [x] Integrate Swagger --- (Pending: Add detailed descriptions for APIs)
- [x] Added interceptor for API execution time tracking