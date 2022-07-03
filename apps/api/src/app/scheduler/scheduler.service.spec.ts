import { Test, TestingModule } from "@nestjs/testing";
import { SchedulerService } from "./scheduler.service";
import { RedisService } from 'nestjs-redis';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppService } from "../app.service";
import { PrismaService } from "../prisma.service";
import { TelemetryService } from "../telemetry/telemetry.service";
import { PosthogModule } from "nestjs-posthog";
import { TerminusModule } from "@nestjs/terminus";
import { HttpModule } from "@nestjs/axios";
import { RedisHealthModule } from "@liaoliaots/nestjs-redis/health";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RedisModule } from "@liaoliaots/nestjs-redis";

describe("SchedulerService", () => {
  let service: SchedulerService;
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
      providers: [SchedulerService, AppService, PrismaService, TelemetryService, ],
    })
    .overrideProvider(RedisService)
    .useValue(mockRedisService)
    .compile();

    service = module.get<SchedulerService>(SchedulerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
