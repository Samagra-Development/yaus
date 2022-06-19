import { RedisLockModule } from "@huangang/nestjs-simple-redis-lock";
import { Test, TestingModule } from "@nestjs/testing";
import { SchedulerService } from "./scheduler.service";
import { RedisModule, RedisService } from 'nestjs-redis';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppService } from "../app.service";
import { PrismaService } from "../prisma.service";

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
        RedisLockModule.registerAsync({
        useFactory: async (redisManager: RedisService) => {
          return { prefix: ':lock:', client: redisManager.getClient() }
        },
        inject: [RedisService]
      }),],
      providers: [SchedulerService, { provide: RedisService, useValue: mockRedisService }, AppService, PrismaService],
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
