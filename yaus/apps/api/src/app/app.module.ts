import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from 'nestjs-redis';
import { RouterService } from './router/router.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TelemetryService } from './telemetry/telemetry.service';
import { PrismaService } from './prisma.service';
import { TerminusModule } from '@nestjs/terminus';
import { PosthogModule } from 'nestjs-posthog';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    RedisModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          name: 'db',
          url: config.get('REDIS_URI'),
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
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, RouterService, PrismaService, TelemetryService],
})
export class AppModule {}
