FROM node:16 AS builder

# Create app directory
WORKDIR /app

#RUN cp .env .env
RUN mkdir -p broker
RUN mkdir -p redisinsight
RUN mkdir -p prisma
RUN chown -R 1001:1001 broker
RUN chown -R 1001:1001 redisinsight

COPY package.json ./
COPY yarn.lock ./
COPY apps/api/src/app/prisma/schema.prisma ./prisma

# Install app dependencies
RUN yarn install
#RUN npx prisma generate --schema=./app/prisma/schema.prisma
#RUN npx prisma migrate dev --schema=./app/prisma/schema.prisma
#RUN npx prisma db seed
#RUN sleep 30

COPY . .

RUN yarn run build

FROM node:16

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "npx", "nx", "serve", "api" ]
