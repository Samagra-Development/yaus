import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisHealthModule } from '@liaoliaots/nestjs-redis/health';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { PosthogModule } from 'nestjs-posthog';
import { RedisService } from 'nestjs-redis';

import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { TelemetryService } from './telemetry/telemetry.service';
import { Link } from './app.interface';

describe('AppService', () => {
  let service: AppService;
  let prisma: PrismaService;
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
        TerminusModule,
        HttpModule,
        RedisHealthModule,
      ],
      providers: [
        ConfigService,
        AppService,
        PrismaService,
        TelemetryService,
      ],
    })
    .overrideProvider(RedisService)
    .useValue(mockRedisService)
    .compile();

    service = module.get<AppService>(AppService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should return url with query params appended to it", async () => {
    const url = "https://google.com";
    const hashId = "1";
    const queryParams = {
      hello: "1234",
      world: "5678",
    };

    const link: Link = {
      id: "1",
      user: null,
      tags: [],
      clicks: 0,
      url: url,
      hashid: +hashId,
      project: null,
      customHashId: null,
    };

    prisma.link.findMany = jest.fn().mockResolvedValueOnce([link]);

    expect(await service.redirect(hashId, queryParams)).toBe(
      `${url}?hello=1234&world=5678`
    );
  });
});
