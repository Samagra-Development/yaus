```shell
cd api
unzip pgdata.zip
docker-compose up -d shortdb gql yaus-broker shortnr-cache
npx nx serve api
```

### TODO
1. Migrate to Fastify
2. Add all the routes that are not yet implemented
3. Prisma Schema Setup
4. Posthog integration
5. Health Check APIs (https://docs.nestjs.com/recipes/terminus)
6. Admin APIs