## Yet Another URL Shortener

Batteries included URL Shortener that is designed for speed and scalability.

### Design

[Docs here](https://github.com/Samagra-Development/yaus/tree/master/docs)

## Setup

There are two ways in which you can get up and running with this project.

If you are just looking around and want to see quickly how this project works we recommend you start with [Gitpod](https://www.gitpod.io/) it is a service that runs your code in the cloud.

All you have to do is click the button below.
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Samagra-Development/yaus)

This will open this project in Gitpod and launch two new tabs. The one with the `https://3333-XXXXX.gitpod.io` type of link is for the backend and the other with the `https://4200-XXXXX.gitpod.io` type of link is for frontend.

(In case your browser doesn't launch these tabs then please check the browser's popup setting).

The other usual way is to set up everything locally on your system, for that, you can follow the instructions given below.

## Installation

### Prerequisites

To run this project, you need to have the following prerequisites installed:

- Docker: [Download and install Docker](https://www.docker.com/get-started)
- Docker Compose: [Download and install Docker Compose](https://docs.docker.com/compose/install/)

### Setup

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

you may need to change few thing in `.env` file according to you environment.

4. Start the project using Docker Compose:

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

6. Run migration in the database

```bash
docker-compose -f docker-compose.local.yml exec yausapp bash

npx prisma migrate dev --schema=apps/api/src/app/prisma/schema.prisma

exit
```

First command will drop you into docker container and second command will run the migration and third will simply pull you out from container.

7. Seed data in the database (Optional)

```bash
docker-compose -f docker-compose.local.yml exec yausapp bash

npx prisma db seed

exit
```

This command will seed the dummy data.

8. If everything is set up correctly, you should be able to access your application at `localhost:3000/api`. If this opens swagger ui your setup is correct.

> _Note: You may want type hints as you code for that we would suggest you to install `node 16` and `yarn 1` and run command `yarn install` for installing local node modules. Do note that this is only for getting type hints and syntax highlighting. Docker will only be using node_modules that is inside the container. If you make any changes to `package.json` then you have to rebuild the container using `docker-compose -f docker-compose.local.yml up -d --build`_

### Contributing

It is recommended to develop on Gitpod since everything is coupled with a bunch of dependencies. To start your Gitpod session click on the button below.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Samagra-Development/yaus)

The repo is structured as a monorepo using the [Nx](https://nx.dev/).
