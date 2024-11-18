import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord, Admin } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
    private readonly kafka = new Kafka({
        brokers: ['localhost:9092'],

    });
    private readonly producer:Producer = this.kafka.producer();
    private readonly admin: Admin = this.kafka.admin();

    

    async onModuleInit() {

       

        console.log('Creating topic "iot-topic" with 3 partitions...');
        await this.admin.connect();
        await this.admin.createTopics({
            topics: [
              {
                topic: 'iot-topic',
                numPartitions: 3,
                replicationFactor: 1,
              },
            ],
          });
          await this.admin.disconnect();
        await this.producer.connect();
    }
    
    async produce(record: ProducerRecord) {
        // console.log(record)
        await this.producer.send(record);
}

    async onApplicationShutdown() {
        await this.producer.disconnect();
    }
}

