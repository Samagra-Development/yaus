FROM node:lts-slim as builder

LABEL version="1.0.0"
LABEL description="YAUS Docker Image"
LABEL maintainer="Chakshu Gautam <chakshu@samagragovernance.in>"

RUN yarn add pm2 -g

# update packages, to reduce risk of vulnerabilities
RUN apt-get update && apt-get upgrade -y && apt-get autoclean -y && apt-get autoremove -y

# set a non privileged user to use when running this image
RUN groupadd -r nodejs && useradd -g nodejs -s /bin/bash -d /home/nodejs -m nodejs
USER nodejs
# set right (secure) folder permissions
RUN mkdir -p /home/nodejs/app/node_modules && chown -R nodejs:nodejs /home/nodejs/app

WORKDIR /home/nodejs/app
# set default node env
ARG NODE_ENV=development
ARG SERVER_PORT=8888
# ARG NODE_ENV=production
# to be able to run tests (for example in CI), do not set production as environment
ENV NODE_ENV=${ENV}

ENV NPM_CONFIG_LOGLEVEL=warn

# copy project definition/dependencies files, for better reuse of layers
COPY package.json /home/nodejs/app
COPY yarn.lock /home/nodejs/app

# install dependencies here, for better reuse of layers
RUN yarn install && npm cache clean --force

# copy all sources in the container (exclusions in .dockerignore file)
COPY --chown=nodejs:nodejs . .

# exposed port/s
EXPOSE ${SERVER_PORT}

CMD [ "node", "app.js" ]
