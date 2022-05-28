import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from 'nestjs-redis';
import { RouterService } from './router/router.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TelemetryService } from './telemetry/telemetry.service';

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
    ClientsModule.register([
      {
        name: 'CLICK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://username:password@localhost:5672'],
          queue: 'clicks',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, RouterService, TelemetryService],
})
export class AppModule {}
