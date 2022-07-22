import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';
import { PrismaHealthIndicator } from './prisma/prisma.health';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { RedisHealthIndicator } from '@liaoliaots/nestjs-redis/health';
import Redis from 'ioredis';
import { Link } from './app.interface';

import { AppService } from './app.service';
import { RouterService } from './router/router.service';
import { link as LinkModel } from '@prisma/client';
import { AddROToResponseInterceptor } from './interceptors/addROToResponseInterceptor';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
@UseInterceptors(AddROToResponseInterceptor)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly routerService: RouterService,
    private healthCheckService: HealthCheckService,
    private http: HttpHealthIndicator,
    private redisIndicator: RedisHealthIndicator,
    private prismaIndicator: PrismaHealthIndicator,
    @InjectRedis() private readonly redis: Redis,
    @Inject('CLICK_SERVICE') private clickServiceClient: ClientProxy
  ) {}


  @Get('/health')
  @HealthCheck()
  @ApiOperation({ summary: 'Get Health Check Status' })
  @ApiResponse({ status: 200, description: 'Result Report for All the Health Check Services' })
  async checkHealth() {
    return this.healthCheckService.check([
      async () => this.http.pingCheck('RabbitMQ', 'http://localhost:15672/'),
      async () => this.http.pingCheck('Basic Check', 'http://localhost:3333/api'),
      async () => this.redisIndicator.checkHealth('Redis', { type: 'redis', client: this.redis, timeout: 500 }),
      async () => this.prismaIndicator.isHealthy('Db'),
    ])
  }
  
/*
@Deprecated
*/
@Get('/sr/:code')
@ApiOperation({ summary: 'Redirect with encoded parameters' })
@ApiResponse({ status: 301, description: 'will be redirected to the specified encoded link'})
  async handler(@Param('code') code: string, @Res() res) {
    const resp = await this.routerService.decodeAndRedirect(code)
    this.clickServiceClient
      .send('onClick', {
        hashid: resp.hashid,
      })
      .subscribe();
    if (resp.url !== '') {
      return res.redirect(resp.url);
    } else {
      throw new NotFoundException();
    }
  }

  //http://localhost:3333/api/redirect/208
  @Get('/:hashid')
  @ApiOperation({ summary: 'Redirect Links' })
  @ApiResponse({ status: 301, description: 'will be redirected to the specified link'})
  async redirect(@Param('hashid') hashid: string, @Res() res) {
    const reRouteURL: string = await this.appService.redirect(hashid);
    this.clickServiceClient
      .send('onClick', {
        hashid: hashid,
      })
      .subscribe();
    if (reRouteURL !== '') {
      console.log({reRouteURL}); 
      return res.redirect(302, reRouteURL);
    } else {
      throw new NotFoundException();
    }
  }


  @Post('/register')
  @ApiOperation({ summary: 'Create New Links' })
  @ApiBody({ type: Link })
  @ApiResponse({ type: Link, status: 200})
  async register(@Body() link: Link): Promise<LinkModel> {
    return this.appService.createLink(link);
  }

  
  @Patch('update/:id')
  @ApiOperation({ summary: 'Update Existing Links' })
  @ApiBody({ type: Link })
  @ApiResponse({ type: Link, status: 200})
  async update(@Param('id') id: string, @Body() link: Link ): Promise<LinkModel> {
    return this.appService.updateLink({
      where: { customHashId: id },
      data: { 
        userID: link.user || null,
        tags: link.tags || null,
        clicks: link.clicks || null,
        url: link.url || null,
        hashid: link.hashid || null,
        project: link.project || null,
        customHashId: link.customHashId || null,
       },
    });
  }

  @MessagePattern('onClick')
  async getNotifications(
    @Payload() data: number[],
    @Ctx() context: RmqContext
  ) {
    console.log(`Pattern: ${context.getPattern()}`);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage().content.toString();
    console.log(`Message: ${originalMsg}`);
    await this.appService.updateClicks(JSON.parse(originalMsg).data.hashid);
  }

}
