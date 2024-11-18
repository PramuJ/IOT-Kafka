import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopic, Kafka } from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {

    private readonly kafka = new Kafka({
        brokers: ['localhost:9092'],

    });

    private readonly consumer:Consumer = this.kafka.consumer({
        groupId: 'consumer-group'
    })

    async consume(topic: ConsumerSubscribeTopic , config: ConsumerRunConfig) {
        await this.consumer.connect().catch((err) => {
          console.log(err)  
        });
        await this.consumer.subscribe(topic);
        await this.consumer.run(config);

    }

    async onApplicationShutdown() {
        await this.consumer.disconnect();
    }

}
