import { ConfigModule, ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { PosthogModule } from "nestjs-posthog";
import { TelemetryService } from "../telemetry/telemetry.service";
import { RouterService } from "./router.service";

describe("RouterService", () => {
  let service: RouterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: [".env.local", ".env"],
        }),
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
      ],
      providers: [RouterService, ConfigService, TelemetryService],
    }).compile();

    service = module.get<RouterService>(RouterService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
