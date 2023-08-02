import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { PrismaService } from './prisma.service';
import { link, Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config'
import { TelemetryService } from './telemetry/telemetry.service';
import { Link } from './app.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    private readonly redisService: RedisService,
    private prisma: PrismaService,
    private telemetryService: TelemetryService,
    ) {}
    /**
     * A generic function to set key value in redis
     * @param key 
     * @param value 
     */
  async setKeyValueInRedis(key: string, value: string): Promise<void> {
      const client = await this.redisService.getClient(this.configService.get<string>('REDIS_NAME'));
      client.set(key, value);
  }
  /**
   * A generic function to set expiry for a key
   * @param key 
   * @param ttl 
   */
  async setKeyWithExpiry(key:string,ttl:number): Promise<void> {
    const client = await this.redisService.getClient(this.configService.get<string>('REDIS_NAME'));
    client.expire(key, ttl);
  }
  /**
   * set the link data in redis with expiry
   * @param Data 
   */
  async setKey(Data:link): Promise<void> {
    // expiration in seconds
    let ttl = parseInt(Data?.params["expiry"]);  
    this.setKeyValueInRedis(Data.hashid.toString(), JSON.stringify(Data));
    !Number.isNaN(ttl) ? this.setKeyWithExpiry(Data.hashid.toString(), ttl) : 0;

    if(!Number.isNaN(Data.customHashId)) {
      this.setKeyValueInRedis(Data.customHashId, Data.hashid.toString());
      !Number.isNaN(ttl) ? this.setKeyWithExpiry(Data.customHashId, ttl) : 0;
    }
  }

  async updateClicks(urlId: string): Promise<void> {
    const client =  this.redisService.getClient(this.configService.get<string>('REDIS_NAME'));
    // client.get(urlId).then(async (value: string) => {});
    client.incr(urlId);
  }
 /**
 * Updates the click count in the postgres db based on hashId or customhashid
 * @param hashID 
 */
  async updateClicksInPostgresDB(hashID: string): Promise<void> {
   
    // Check if given id is customhashid  
    Number.isNaN(parseInt(hashID)) ? hashID = await this.fetchAKey(hashID):0;

    const link = await this.prisma.link.findFirst({
      where: { hashid: parseInt(hashID)},
    })

    let cnt = await this.prisma.link.update({
           where: { id: link.id },
           data: { clicks: link.clicks + 1 }
       });
  }

  async fetchAllKeys(): Promise<string[]> {
    const client = await this.redisService.getClient(this.configService.get<string>('REDIS_NAME'));
    const keys: string[] = await client.keys('*');
    return keys
  }
  async fetchAKey(key: string): Promise<string> {
    const client = await this.redisService.getClient(this.configService.get<string>('REDIS_NAME'));
    const value: string = (await client.get(key))?.toString();
    return value
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
  
    async createLinkInCache(data: link): Promise<link> {
      this.setKey(data);
      return data;
    }
/**
 * #### Persist the links in DB as well as cache to Redis after due validation.
 * 
 * A valid customHashId should not be a number and shouldn't have any special characters other than hyphen and underscore.
 * 
 * - Example of a valid customHashId: "my-custom-hash-id", "hasd1212"
 * - Example of an invalid customHashId: "123", "my-custom-hash-id!"
 * 
 * @param data - The link data to be persisted.
 * @returns The link object that has been persisted.
 */
    async createLinkInDB(data: Prisma.linkCreateInput): Promise<link> {
      const validCustomHashIdRegex = /^(?!^[0-9]+$)[a-zA-Z0-9_-]+$/;
      // validate the incoming request for custom hashId
      if (data.customHashId != undefined && !validCustomHashIdRegex.exec(data.customHashId)) {
        return Promise.reject(new Error('Invalid custom hashId. Only alphanumeric characters, hyphens and underscores are allowed.'));
      }
    
      try {
        // create the link in DB
        const link = await this.prisma.link.create({
          data,
        });
    
        // create it in redis
        this.fetchAKey(link.hashid.toString()).then((value: string) => {
          if (value == undefined) {
            this.setKey(link);
          } else {
            console.error(`Error: The key ${link.hashid} already exists in the Redis database.`);
          }
        });
        return link;
      } catch (error) {
        console.log("Failed to create link in the database: " + error.message);
        throw new Error('Failed to create link in the database.');
      }
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
/**
 * resolve the id for hashId or customhashid and fetch the url from redis
 * @param Id 
 * @returns 
 */
    async resolveRedirect(Id: string): Promise<string> {
      const validHashIdRegex = /^[0-9]*$/;
      if(validHashIdRegex.exec(Id)){
          return this.redirect(Id);
      }
      else
      { 
        console.log("The customHashId is:"+ Id);
        const hashId = await this.fetchAKey(Id);
        return this.redirect(hashId);
      }
    }
/**
 * A generic function to fetch the url from redis based on hashId 
 * @param hashid 
 * @returns 
 */
    async redirect(hashid: string): Promise<string> {

          return this.fetchAKey(hashid).then((value: string) => {
          const link = JSON.parse(value);
          // console.log("The link is:"+ link.url);
          const url = link.url
          const params = link.params
          const ret = [];
          // console.log("The params are:"+ params + url);
          if(params == null){
            return url;
          }else {
            Object.keys(params).forEach(function(d) {
              ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(params[d]));
            })
            return `${url}?${ret.join('&')}` || '';
          }
        })
        .catch(err => {
            this.telemetryService.sendEvent(this.configService.get<string>('POSTHOG_DISTINCT_KEY'), "Exception in getLinkFromHashIdOrCustomHashId query", {error: err.message})
            return '';
          });

      }
}
