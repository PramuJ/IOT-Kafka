import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { IotModule } from './iot/iot.module';
import { RedisService } from './redis/redis.service';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    KafkaModule,
    IotModule,
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379', 
      options: {}, 
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule {}
