import { Injectable, OnModuleInit } from "@nestjs/common";
import { RedisService } from "@liaoliaots/nestjs-redis";
import { ConfigService } from "@nestjs/config";
import { link } from "@prisma/client";

@Injectable()
export class RedisUtils {
  constructor(
    private configService: ConfigService,
    private readonly redisService: RedisService
  ) {}

  /**
   * A generic function to set key value in redis
   * @param key
   * @param value
   */
  async setKeyValueInRedis(key: string, value: string): Promise<void> {
    const client = await this.redisService.getClient(
      this.configService.get<string>("REDIS_NAME")
    );
    client.set(key, value);
  }

  /**
   * A generic function to set expiry for a key
   * @param key
   * @param ttl
   */
  async setKeyWithExpiry(key: string, ttl: number): Promise<void> {
    const client = await this.redisService.getClient(
      this.configService.get<string>("REDIS_NAME")
    );
    client.expire(key, ttl);
  }

  /**
   * set the link data in redis with expiry
   * @param Data
   */
  async setKey(Data: link): Promise<void> {
    // expiration in seconds
    let ttl = parseInt(Data?.params?.["expiry"]) ?? NaN;
    this.setKeyValueInRedis(Data.hashid.toString(), JSON.stringify(Data));
    !Number.isNaN(ttl) ? this.setKeyWithExpiry(Data.hashid.toString(), ttl) : 0;

    if (!Number.isNaN(Data.customHashId) && Data.customHashId !== null) {
      // console.log("custom hash id found"+Data.customHashId);
      this.setKeyValueInRedis(Data.customHashId, Data.hashid.toString());
      !Number.isNaN(ttl) ? this.setKeyWithExpiry(Data.customHashId, ttl) : 0;
    }
  }

  /**
   * clear the link data in redis
   * @param Data
   */
  async clearKey(Data: link): Promise<void> {
    const client = await this.redisService.getClient(
      this.configService.get<string>("REDIS_NAME")
    );
    // Test this
    client.del(Data.hashid.toString());
    client.del(Data.customHashId);
  }

  /**
   * fetch a link data from redis
   * @param key
   * @returns
   */
  async fetchKey(key: string): Promise<string> {
    const client = await this.redisService.getClient(
      this.configService.get<string>("REDIS_NAME")
    );
    const value: string = (await client.get(key))?.toString();
    return value;
  }

  /**
   * fetch all keys from redis
   * @returns
   */
  async fetchAllKeys(): Promise<string[]> {
    const client = await this.redisService.getClient(
      this.configService.get<string>("REDIS_NAME")
    );
    const keys: string[] = await client.keys("*");
    return keys;
  }

  /**
   * update clicks in redis
   * @Deprecated
   * @param urlId
   */
  async updateClicks(urlId: string): Promise<void> {
    const client = this.redisService.getClient(
      this.configService.get<string>("REDIS_NAME")
    );
    // client.get(urlId).then(async (value: string) => {});
    client.incr(urlId);
  }

  /**
   * create a link in redis
   * @deprecated
   * @param data
   * @returns
   */
  async createLinkInCache(data: link): Promise<link> {
    this.setKey(data);
    return data;
  }
}
