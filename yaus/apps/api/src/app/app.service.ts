import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}

  async updateClicks(urlId: string): Promise<void> {
    const client = await this.redisService.getClient('db');
    client.incr(urlId);
  }
}
