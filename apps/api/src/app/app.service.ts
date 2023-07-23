import { Injectable } from "@nestjs/common";
import { RedisService } from "@liaoliaots/nestjs-redis";
import { PrismaService } from "./prisma.service";
import { link, Prisma } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import { TelemetryService } from "./telemetry/telemetry.service";

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    private readonly redisService: RedisService,
    private prisma: PrismaService,
    private telemetryService: TelemetryService
  ) {}

  async setKey(hashid: string): Promise<void> {
    const client = await this.redisService.getClient(
      this.configService.get<string>("REDIS_NAME")
    );
    client.set(hashid, 0);
  }

  async updateClicks(urlId: string): Promise<void> {
    const client = await this.redisService.getClient(
      this.configService.get<string>("REDIS_NAME")
    );
    client.incr(urlId);
  }

  async fetchAllKeys(): Promise<string[]> {
    const client = await this.redisService.getClient(
      this.configService.get<string>("REDIS_NAME")
    );
    const keys: string[] = await client.keys("*");
    return keys;
  }

  async updateClicksInDb(): Promise<void> {
    const client = await this.redisService.getClient(
      this.configService.get<string>("REDIS_NAME")
    );
    const keys: string[] = await this.fetchAllKeys();
    for (const key of keys) {
      client.get(key).then(async (value: string) => {
        const updateClick = await this.prisma.link.updateMany({
          where: {
            OR: [
              {
                hashid: Number.isNaN(Number(key)) ? -1 : parseInt(key),
              },
              {
                customHashId: key,
              },
            ],
          },
          data: {
            clicks: parseInt(value),
          },
        });
      });
    }
  }

  async link(
    linkWhereUniqueInput: Prisma.linkWhereUniqueInput
  ): Promise<link | null> {
    return this.prisma.link.findUnique({
      where: linkWhereUniqueInput,
    });
  }

  async links(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.linkWhereUniqueInput;
    where?: Prisma.linkWhereInput;
    orderBy?: Prisma.linkOrderByWithRelationInput;
  }): Promise<link[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.link.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createLink(data: Prisma.linkCreateInput): Promise<link> {
    const link = await this.prisma.link.create({
      data,
    });

    this.setKey(link.hashid.toString());
    return link;
  }

  async updateLink(params: {
    where: Prisma.linkWhereUniqueInput;
    data: Prisma.linkUpdateInput;
  }): Promise<link> {
    const { where, data } = params;
    return this.prisma.link.update({
      data,
      where,
    });
  }

  async deleteLink(where: Prisma.linkWhereUniqueInput): Promise<link> {
    return this.prisma.link.delete({
      where,
    });
  }

  async redirect(hashid: string): Promise<string> {
    return this.prisma.link
      .findMany({
        where: {
          OR: [
            {
              hashid: Number.isNaN(Number(hashid)) ? -1 : parseInt(hashid),
            },
            { customHashId: hashid },
          ],
        },
        select: {
          url: true,
          params: true,
          hashid: true,
        },
        take: 1,
      })
      .then((response) => {
        const url = response[0].url;
        const params = response[0].params;
        const ret = [];

        const now = new Date(); // get the current date and time
        const timestamp = now.getTime(); // get the timestamp

        console.log(now, timestamp, parseInt(params["expiry"]));

        // check if the link has expired
        // assumption : expired link === no link found

        if (
          !Number.isNaN(Number(params["expiry"])) &&
          parseInt(params["expiry"]) < timestamp
        ) {
          console.log("Link has expired");
          return "";
        }

        this.updateClicks(response[0].hashid.toString());

        if (params == null) {
          return url;
        } else {
          Object.keys(params).forEach(function (d) {
            ret.push(
              encodeURIComponent(d) + "=" + encodeURIComponent(params[d])
            );
          });
          return `${url}?${ret.join("&")}` || "";
        }
      })
      .catch((err) => {
        this.telemetryService.sendEvent(
          this.configService.get<string>("POSTHOG_DISTINCT_KEY"),
          "Exception in getLinkFromHashIdOrCustomHashId query",
          { error: err.message }
        );
        return "";
      });
  }
}
