import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisHealthModule } from '@liaoliaots/nestjs-redis/health';
import { PrismaHealthIndicator } from './prisma/prisma.health';
import { RouterService } from './router/router.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
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
    RedisModule.forRoot({
      readyLog: true,
      config: {
          host: 'localhost',
          port: 6381,
          password: 'redismain'
      }
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
  controllers: [AppController],
  providers: [AppService, ConfigService, RouterService, PrismaService, TelemetryService, PrismaHealthIndicator],
})
export class AppModule {}
