import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "src/kafka/consumer/consumer.service";

@Injectable()
export class IotConsumer implements OnModuleInit {
    
    constructor(private readonly consumerService: ConsumerService) {
    
  
}
    async onModuleInit() {
        console.log('consumer connected')
        await this.consumerService.consume({topic:'iot-topic'}, {
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    value: message.value.toString(),
                    topic: topic.toString(),
                    partition: partition.toString(),
                })
            }
        })
    }

}
