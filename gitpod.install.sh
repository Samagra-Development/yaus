#!/bin/sh

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Load NVM
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 16
nvm use 16

# Start DB and services 
cp src/sample.env .env
sudo chown -R 1001:1001 broker # Bitnami RabbitMQ issues
docker-compose up -d shortdb gql yaus-broker shortnr-cache shortnr-redis-commander

# Starting Server
cp .env src/.env
cd src
serverBaseURl="SERVER_BASE_URL=${GITPOD_WORKSPACE_URL:-default_value}"
sed "13s|^.*$|$serverBaseURl|" .env > .env.tmp
mv .env.tmp .env
yarn install
yarn start