#!/bin/sh

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Load NVM
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 16
nvm use 16

cp gitpod.env .env
# sudo apt-get install unzip
# unzip pgdata.zip
# rm -rf pgdata.zip
# rm -rf __MACOSX

# Resolving permission errors
mkdir -p broker
mkdir -p redisinsight
sudo chown -R 1001:1001 broker
sudo chown -R 1001:1001 redisinsight

docker-compose -f docker-compose.gitpod.yml up -d

yarn install
npx prisma generate --schema=/workspace/yaus/apps/api/src/app/prisma/schema.prisma
npx prisma migrate dev --schema=/workspace/yaus/apps/api/src/app/prisma/schema.prisma
npx prisma db seed

# sleep for 15 seconds
sleep 30

# Starting Server - https://8888-
# serverBaseURL=${GITPOD_WORKSPACE_URL:-default_value}
# serverBaseURL="https://8088-${serverBaseURL:8}/add/?name=shortnr&host=shortnr-cache&port=6379"
# curl "${serverBaseURL}"
# echo "Open this URL in a the browser to add redis to redisInsight ${serverBaseURL}"

# start api server
npx nx serve api
