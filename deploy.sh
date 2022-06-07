#!/bin/sh

cp sample.env .env
cd apps/api
unzip pgdata.zip
docker-compose up -d shortdb gql yaus-broker shortnr-cache
npx nx serve api