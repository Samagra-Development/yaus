# Stage 1: Build environment
FROM node:16 AS build

# Install nvm and node
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Load NVM
ENV NVM_DIR /root/.nvm
RUN . $NVM_DIR/nvm.sh && nvm install 16 && nvm use 16

# Set work directory
WORKDIR /app

# Copy necessary files
COPY . .

# Install dependencies
RUN yarn install

# Generate Prisma client
RUN npx prisma generate --schema=/workspace/yaus/apps/api/src/app/prisma/schema.prisma

# Apply Prisma migrations
RUN npx prisma migrate dev --schema=/workspace/yaus/apps/api/src/app/prisma/schema.prisma

# Seed the database
RUN npx prisma db seed

# Stage 2: Runtime environment
FROM node:16

# Copy files from build stage
COPY --from=build /app /app

# Set work directory
WORKDIR /app

# Create directories and set permissions
RUN mkdir -p broker redisinsight && \
    chown -R 1001:1001 broker && \
    chown -R 1001:1001 redisinsight

# Start necessary services
RUN apt-get update && apt-get install -y unzip
# COPY pgdata.zip /app
# RUN unzip pgdata.zip && rm -rf pgdata.zip __MACOSX

# Start the server
CMD sleep 30 && \
    serverBaseURL=${GITPOD_WORKSPACE_URL:-default_value} && \
    serverBaseURL="https://8088-${serverBaseURL:8}/add/?name=shortnr&host=shortnr-cache&port=6379" && \
    curl "${serverBaseURL}" && \
    echo "Open this URL in a browser to add redis to redisInsight ${serverBaseURL}" && \
    npx nx serve api

EXPOSE 8088
