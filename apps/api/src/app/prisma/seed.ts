import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.link.upsert({
    where: { customHashId: "google" },
    update: {},
    create: {
      userID: "1cd2bd98-7eba-4a4a-8cec-32eeb3648cf4",
      tags: ["dummy"],
      clicks: 0,
      url: "https://google.com",
      project: "1cd2bd98-7eba-4a4a-8cec-32eeb3648cf4",
      customHashId: "google",
      createdAt: "2021-08-09T00:00:00.000Z",
    },
  });

  const bob = await prisma.link.upsert({
    where: { customHashId: "fb" },
    update: {},
    create: {
      userID: "4b7c207c-3c6e-440f-9e6f-29736f23a3bb",
      tags: ["dummy"],
      clicks: 0,
      url: "https://facebook.com",
      project: "4b7c207c-3c6e-440f-9e6f-29736f23a3bb",
      customHashId: "fb",
      createdAt: "2021-08-09T00:00:00.000Z",
    },
  });
  console.log({ alice, bob });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
