import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "src/kafka/consumer/consumer.service";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class IotConsumer implements OnModuleInit {
    
    constructor(private readonly consumerService: ConsumerService, private readonly redis:RedisService) {
    
  
}
    async onModuleInit() {
        console.log('consumer connected')
        await this.consumerService.consume({topic:'iot-topic'}, {
            eachMessage: async ({ topic, partition, message }) => {

                const value = message.value.toString()
                const redisKey = `iot-topic:partition:${partition}`

                try {
                   await this.redis.cacheList(redisKey, value,3600)
                } catch (error) {
                    // console.log(error)
                }

                console.log({
                    value: message.value.toString(),
                    topic: topic.toString(),
                    partition: partition.toString(),
                })
            }
        })
    }

}
