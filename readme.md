```shell
cd api
unzip pgdata.zip
docker-compose up -d shortdb gql yaus-broker shortnr-cache
npx nx serve api
```