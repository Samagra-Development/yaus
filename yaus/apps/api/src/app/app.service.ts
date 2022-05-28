import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { PrismaService } from './prisma.service';
import { link, Prisma } from '@prisma/client';
import { Link } from './app.interface';

@Injectable()
export class AppService {
  constructor(
    private readonly redisService: RedisService,
    private prisma: PrismaService,
    ) {}

  async updateClicks(urlId: string): Promise<void> {
    const client = await this.redisService.getClient('db');
    client.incr(urlId);
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
      return this.prisma.link.create({
        data,
      });
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

}
