import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { IotModule } from './iot/iot.module';

@Module({
  imports: [KafkaModule, IotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
