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
import { RedisService } from '@liaoliaots/nestjs-redis';
import { RedisHealthIndicator } from '@liaoliaots/nestjs-redis/health';
import Redis from 'ioredis';
import { Link } from './app.interface';

import { AppService } from './app.service';
import { RouterService } from './router/router.service';
import { link as LinkModel, Prisma, link } from '@prisma/client';
import { AddROToResponseInterceptor } from './interceptors/addROToResponseInterceptor';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { TelemetryService } from './telemetry/telemetry.service';

@Controller()
@UseInterceptors(AddROToResponseInterceptor)
export class AppController {
  private readonly redis: Redis

  constructor(
    private readonly appService: AppService,
    private readonly routerService: RouterService,
    private healthCheckService: HealthCheckService,
    private http: HttpHealthIndicator,
    private redisIndicator: RedisHealthIndicator,
    private prismaIndicator: PrismaHealthIndicator,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly telemetryService: TelemetryService,
    @Inject('CLICK_SERVICE') private clickServiceClient: ClientProxy
  ) {
      this.redis = redisService.getClient(configService.get('REDIS_NAME'));
  }


  @Get('/health')
  @HealthCheck()
  @ApiOperation({ summary: 'Get Health Check Status' })
  @ApiResponse({ status: 200, description: 'Result Report for All the Health Check Services' })
  async checkHealth() {
    return this.healthCheckService.check([
      async () => this.http.pingCheck('RabbitMQ', this.configService.get('RABBITMQ_HEALTH_URL')),
      async () => this.http.pingCheck('Basic Check', this.configService.get('BASE_URL')),
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
        hashid: resp?.hashid,
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
    
    const reRouteURL: string = await this.appService.resolveRedirect(hashid);

    if (reRouteURL !== '') {
      console.log({reRouteURL});
      this.clickServiceClient
      .send('onClick', {
        hashid: hashid,
      })
      .subscribe();
      // if we shift this also in service layer then maybe we can capture better data but then it will be a bit slow
      // as well a bit more complex
      // tight coupling with the service layer
      this.telemetryService.sendEvent(
        this.configService.get<string>("POSTHOG_DISTINCT_KEY"),
        `Redirected Link`,
        {
          routeName: `/${hashid}}`,
          routeParam: hashid,
          link: reRouteURL,
        }
      );
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
      const response:Promise<link> =  this.appService.createLinkInDB(link);
      // discuss this stuff , shouuld we send the event here or in the service
      // or we make this await and then send the event
      this.telemetryService.sendEvent(
        this.configService.get<string>("POSTHOG_DISTINCT_KEY"),
        `Created Link`,
        {
          routeName: `/register`,
          link: link,
        }
      );
      return response;
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update Existing Links' })
  @ApiBody({ type: Link })
  @ApiResponse({ type: Link, status: 200})
  async update(@Param('id') id: string, @Body() link: link ): Promise<LinkModel> {
    // make this a separate function in telemetry service
    this.telemetryService.sendEvent(
      this.configService.get<string>("POSTHOG_DISTINCT_KEY"),
      `Updated Link`,
      {
        routeName: `update/:id`,
        routeParam: id,
        link: link,
      }
    );
    return this.appService.updateLink(id, link);
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
    // await this.appService.updateClicks(JSON.parse(originalMsg).data.hashid);
    let id = JSON.parse(originalMsg).data.hashid;
    await this.appService.updateClicksInPostgresDB(id).then((res) => {console.log("UPDATED IN DB SUCCESS")}).catch((err) => {console.log(err)});
  }
  
}
