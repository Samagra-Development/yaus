import { Test, TestingModule } from "@nestjs/testing";
import { SchedulerService } from "./scheduler.service";
import { RedisModule, RedisService } from 'nestjs-redis';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppService } from "../app.service";
import { PrismaService } from "../prisma.service";
import { TelemetryService } from "../telemetry/telemetry.service";
import { PosthogModule } from "nestjs-posthog";

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
              name: config.get('REDIS_NAME'),
              url: config.get('REDIS_URI'),
            };
          },
          inject: [ConfigService],
        }),
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
        }),],
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
