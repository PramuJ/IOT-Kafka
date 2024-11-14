import { Module } from '@nestjs/common';
import { IotController } from './iot.controller';
import { IotService } from './iot.service';
import { KafkaModule } from 'src/kafka/kafka.module';
import { IotConsumer } from './iot.consumer';

@Module({
  imports: [KafkaModule],
  controllers: [IotController],
  providers: [IotService,IotConsumer]
})
export class IotModule {}
