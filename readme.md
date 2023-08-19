## Yet Another URL Shortener

Batteries included URL Shortener that is designed for speed and scalability.

### Design

[Docs here](https://github.com/Samagra-Development/yaus/tree/master/docs)

## Installation

### Development

#### Pre-requisites

To run this project, you need to have the following pre-requisites installed:

- Node 16
- Yarn 1
- Docker: [Download and install Docker](https://www.docker.com/get-started)
- Docker Compose: [Download and install Docker Compose](https://docs.docker.com/compose/install/)

#### Setup

1. Clone the repository:

```bash
git clone https://github.com/Samagra-Development/yaus.git
```

2. Navigate to the project directory:

```bash
cd yaus
```

3. Create environment file:

```bash
cp sample.env .env
```

4. Start the project dependencies using Docker Compose:

```bash
docker-compose -f docker-compose.local.yml up -d
```

The `-d` flag is used to run the containers in the background (detached mode). If you want to see the container logs, you can omit the `-d` flag.

Docker Compose will read the `docker-compose.local.yml` file and start the defined services.

5. Verify that the containers are running:

```bash
docker-compose -f docker-compose.local.yml ps
```

This command will display the status of the containers defined in the `docker-compose.local.yml` file.

6. Install app dependencies:

```bash
yarn install
```

7. Run migrations:

```bash
npx prisma migrate dev --schema=apps/api/src/app/prisma/schema.prisma
```

8. Seed data in the database (Optional):

```bash
npx prisma db seed
```

This command will seed the dummy data.

9. Start the app:

To start backend app:

```bash
npx nx serve api
```

To start frontend app:

```bash
npx nx serve admin
```

8. If everything is set up correctly, you should be able to access backend at `localhost:3333/api`. If this opens swagger ui your setup is correct.
   For frontend visit `localhost:4200`.

### Production

#### Pre-requisites

To run this project, you need to have the following pre-requisites installed:

- Docker: [Download and install Docker](https://www.docker.com/get-started)
- Docker Compose: [Download and install Docker Compose](https://docs.docker.com/compose/install/)

#### Setup

1. Clone the repository:

```bash
git clone https://github.com/Samagra-Development/yaus.git
```

2. Navigate to the project directory:

```bash
cd yaus
```

3. Create environment file:

```bash
cp sample.env .env
```

You'd need to edit few things in the `.env` for prod. like for example you'd need to replace `localhost` with corresponding container name.

4. Start the project using Docker Compose:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

The `-d` flag is used to run the containers in the background (detached mode). If you want to see the container logs, you can omit the `-d` flag.

Docker Compose will read the `docker-compose.prod.yml` file and start the defined services.

5. Verify that the containers are running:

```bash
docker-compose -f docker-compose.prod.yml ps
```

This command will display the status of the containers defined in the `docker-compose.prod.yml` file.

6. Run migrations:

```bash
docker-compose -f docker-compose.prod.yml exec app bash

npx prisma migrate dev --schema=apps/api/src/app/prisma/schema.prisma

exit
```

First command will drop you into docker container and second command will run the migration and third will simply pull you out from container.

7. Seed data in the database (Optional):

```bash
docker-compose -f docker-compose.local.yml exec app bash

npx prisma db seed

exit
```

This command will seed the dummy data.

8. If everything is set up correctly, you should be able to access backend at `localhost:3333/api`. If this opens swagger ui your setup is correct.

### Contributing

It is recommended to develop on Gitpod since everything is coupled with a bunch of dependencies. To start your Gitpod session click on the button below.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Samagra-Development/yaus)

The repo is structured as a monorepo using the [Nx](https://nx.dev/).

# Contributors

A big thanks to all the contributors who have helped make this project possible!

[![Contributors](https://contributors-img.web.app/image?repo=Samagra-Development/yaus)](https://github.com/Samagra-Development/yaus/graphs/contributors)
