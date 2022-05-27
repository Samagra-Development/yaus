### Setting Up Backend

```shell
cd api
unzip pgdata.zip
docker-compose up -d shortdb gql yaus-broker shortnr-cache
npx nx serve api
```

### Setting up Frontend

```shell
npx nx server admin
```

### TODO
1. Migrate to Fastify
2. Add all the routes that are not yet implemented
3. Prisma Schema Setup
4. Posthog integration
5. Health Check APIs (https://docs.nestjs.com/recipes/terminus)
6. Admin APIs
7. Integrate Swagger