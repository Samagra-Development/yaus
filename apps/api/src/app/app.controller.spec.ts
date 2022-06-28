import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisService } from 'nestjs-redis';
import { PrismaService } from './prisma.service';
import { RouterService } from './router/router.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TelemetryService } from './telemetry/telemetry.service';
import { PosthogModule } from 'nestjs-posthog';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { HttpModule } from '@nestjs/axios';
import { RedisHealthModule } from '@liaoliaots/nestjs-redis/health';
import { PrismaHealthIndicator } from './prisma/prisma.health';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;
  let mockRedisSet;

  const mockRedis = {
    set: mockRedisSet,
  };

  const mockRedisService = {
    getClient: jest.fn(() => mockRedis),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TerminusModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.local', '.env'],
        }),
        RedisModule.forRootAsync({
          useFactory: (config: ConfigService) => {
            return {
              readyLog: true,
              config: {
                name: 'db',
                url: config.get('REDIS_URI'),
              }
            };
          },
          inject: [ConfigService],
        }),
        ClientsModule.registerAsync([
          {
            name: 'CLICK_SERVICE',
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                transport: Transport.RMQ,
                options: {
                  urls: [config.get<string>('RMQ_URL')],
                  queue: config.get<string>('RMQ_QUEUE'),
                  queueOptions: {
                    durable: config.get<boolean>('RMQ_QUEUE_DURABLE'),
                  },
                },
            }),
            inject: [ConfigService],
          },
        ]),
        PosthogModule.forRootAsync({
          useFactory: (config: ConfigService) => {
            return {
              apiKey: config.get<string>('POSTHOG_API_KEY'),
              options: {
                host: config.get<string>('POSTHOG_API_HOST'),
                flushAt: config.get<number>('POSTHOG_BATCH_SIZE'),
                flushInterval: config.get<number>('POSTHOG_FLUSH_INTERVAL'),
              },
              mock: false,
            };
          },
          inject: [ConfigService],
        }),
        HttpModule,
        RedisHealthModule,
      ],
      controllers: [AppController],
      providers: [
        AppService,
        ConfigService,
        { provide: RedisService, useValue: mockRedisService }, 
        PrismaService,
        RouterService,
        TelemetryService,
        PrismaHealthIndicator
    ],
    })
    .overrideProvider(RedisService)
    .useValue(mockRedisService)
    .compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

});
