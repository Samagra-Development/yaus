import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { PrismaService } from './prisma.service';
import { link, Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config'
import { TelemetryService } from './telemetry/telemetry.service';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    private readonly redisService: RedisService,
    private prisma: PrismaService,
    private telemetryService: TelemetryService,
    ) {}

  async setKey(hashid: string): Promise<void> {
    const client = await this.redisService.getClient(this.configService.get<string>('REDIS_NAME'));
    client.set(hashid, 0);
  }
  
  async updateClicks(urlId: string): Promise<void> {
    const client = await this.redisService.getClient(this.configService.get<string>('REDIS_NAME'));
    client.incr(urlId);
  }

  async fetchAllKeys(): Promise<string[]> {
    const client = await this.redisService.getClient(this.configService.get<string>('REDIS_NAME'));
    const keys: string[] = await client.keys('*');
    return keys
  }

  async updateClicksInDb(): Promise<void> {
    const client = await this.redisService.getClient(this.configService.get<string>('REDIS_NAME'));
    const keys: string[] = await this.fetchAllKeys()
    for(const key of keys) {
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

  async link(linkWhereUniqueInput: Prisma.linkWhereUniqueInput,
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

    async redirect(hashid: string, queryParams?: Record<string, string | string[]>): Promise<string> {
        return this.prisma.link.findMany({
          where: {
            OR: [
              {
                hashid: Number.isNaN(Number(hashid))? -1:parseInt(hashid),
              },
              { customHashId: hashid },
            ],
          },
          select: {
            url: true,
            params: true,
            hashid: true,
          },
          take: 1
        })
        .then(response => {
          let url = response[0].url
          const params = response[0].params
          const ret = [];
          
          this.updateClicks(response[0].hashid.toString());

          if(params != null){
            Object.keys(params).forEach(function(d) {
              ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(params[d]));
            })
            url = `${url}?${ret.join('&')}` || '';
          }

          if (queryParams && Object.keys(queryParams).length) {
            if (params == null) {
              url += "?";
            } else {
              url += "&";
            }
            const qparams = [];
            Object.keys(queryParams).forEach((d: string) => {
              if (Array.isArray(queryParams[d])) {
                (queryParams[d] as string[]).forEach(val => {
                  qparams.push(encodeURIComponent(d) + "=" + encodeURIComponent(val));
                });
              } else {
                qparams.push(encodeURIComponent(d) + "=" + encodeURIComponent(queryParams[d] as string));
              }
            });
            url += qparams.join("&") || "";
          }

          return url;
        })
        .catch(err => {
          this.telemetryService.sendEvent(this.configService.get<string>('POSTHOG_DISTINCT_KEY'), "Exception in getLinkFromHashIdOrCustomHashId query", {error: err.message})
          return '';
        });
      }
}
