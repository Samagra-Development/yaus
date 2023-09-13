import { RedisModule } from "@liaoliaots/nestjs-redis";
import { RedisHealthModule } from "@liaoliaots/nestjs-redis/health";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TerminusModule } from "@nestjs/terminus";
import { Test, TestingModule } from "@nestjs/testing";
import { PosthogModule } from "nestjs-posthog";
import { RedisService } from "nestjs-redis";

import { AppService } from "./app.service";
import { PrismaService } from "./prisma.service";
import { TelemetryService } from "./telemetry/telemetry.service";
import { RedisUtils } from "./utils/redis.utils";

describe("AppService", () => {
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
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: [".env.local", ".env"],
        }),
        RedisModule.forRootAsync({
          useFactory: (config: ConfigService) => {
            return {
              readyLog: true,
              config: {
                name: "db",
                url: config.get("REDIS_URI"),
              },
            };
          },
          inject: [ConfigService],
        }),
        ClientsModule.registerAsync([
          {
            name: "CLICK_SERVICE",
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [config.get<string>("RMQ_URL")],
                queue: config.get<string>("RMQ_QUEUE"),
                queueOptions: {
                  durable: config.get<boolean>("RMQ_QUEUE_DURABLE"),
                },
              },
            }),
            inject: [ConfigService],
          },
        ]),
        PosthogModule.forRootAsync({
          useFactory: (config: ConfigService) => {
            return {
              apiKey: config.get<string>("POSTHOG_API_KEY"),
              options: {
                host: config.get<string>("POSTHOG_API_HOST"),
                flushAt: config.get<number>("POSTHOG_BATCH_SIZE"),
                flushInterval: config.get<number>("POSTHOG_FLUSH_INTERVAL"),
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
        RedisUtils,
      ],
    })
      .overrideProvider(RedisService)
      .useValue(mockRedisService)
      .compile();

    service = module.get<AppService>(AppService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
