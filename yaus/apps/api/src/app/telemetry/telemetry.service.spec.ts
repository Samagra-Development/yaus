import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TelemetryService } from './telemetry.service';
import { PosthogModule } from 'nestjs-posthog';

describe('TelemetryService', () => {
  let service: TelemetryService;

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
        }),
      ],
      providers: [
        TelemetryService, 
        ConfigService,
      ],
    }).compile();

    service = module.get<TelemetryService>(TelemetryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
