#!/bin/sh

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Load NVM
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 16
nvm use 16

sudo apt-get install unzip
unzip pgdata.zip

# Start DB and services 
cp src/sample.env .env
cp .env src/.env
mkdir -p broker
sudo chown -R 1001:1001 broker
docker-compose up -d shortdb gql yaus-broker shortnr-cache shortnr-redis-commander

echo "the script will sleep for 30s to let the services start"
sleep 30s

# Starting Server - https://8888-
cd src
serverBaseURL="SERVER_BASE_URL=${GITPOD_WORKSPACE_URL:-default_value}"
serverBaseURL="https://8888-${serverBaseURL:8}"
sed "13s|^.*$|$serverBaseURL|" .env > .env.tmp
mv .env.tmp .env
yarn install
yarn start