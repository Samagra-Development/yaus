import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PosthogModule } from 'nestjs-posthog';
import { RedisService } from 'nestjs-redis';

import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { TelemetryService } from './telemetry/telemetry.service';

describe('AppService', () => {
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
          envFilePath: ['.env.local', '.env'],
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
      providers: [
        ConfigService,
        AppService,
        { provide: RedisService, useValue: mockRedisService },
        PrismaService,
        TelemetryService,
      ],
    })
    .overrideProvider(RedisService)
    .useValue(mockRedisService)
    .compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


});
