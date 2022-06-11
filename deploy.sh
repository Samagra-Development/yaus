#!/bin/sh

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Load NVM
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 16
nvm use 16

cp sample.env .env
sudo apt-get install unzip
unzip pgdata.zip
rm -rf pgdata.zip
rm -rf __MACOSX

# Resolving permission errors
mkdir -p broker
mkdir -p redisinsight
sudo chown -R 1001:1001 broker
chown -R 1001:1001 redisinsight

docker-compose -f docker-compose.gitpod.yml up -d

yarn install
npx prisma generate --schema=/workspace/yaus/apps/api/src/app/prisma/schema.prisma

# sleep for 15 seconds
sleep 30
curl 'http://localhost:8088/add/?name=shortnr&host=shortnr-cache&port=6379'

# start api server
npx nx serve api
