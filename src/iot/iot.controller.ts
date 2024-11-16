import { Controller, Get } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Controller('iot')
export class IotController {

    constructor(private readonly redis:RedisService){}

    @Get('temperature')
    async getTemp() {
        // Call the method to get messages from Redis
        const messages = await this.redis.readListFromCache('iot-topic:partition:0');
        var firstMinMessage:any[] = messages.slice(-120)
        
        firstMinMessage = firstMinMessage.map( (item)=>{
            return Number(item)
        } )

        console.log(typeof(firstMinMessage))
        // const firstMinAvg = getAverage(firstMinMessage) 

        return firstMinMessage;
      }

      @Get('humidity')
      async getHumidity() {
          // Call the method to get messages from Redis
          const messages = await this.redis.readListFromCache('iot-topic:partition:1');
          return messages;
        }
        
        @Get('product')
    async getProduct() {
        // Call the method to get messages from Redis
        const messages = await this.redis.readListFromCache('iot-topic:partition:2');
        return messages;
      }

      

}

function getAverage(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum / array.length;
}


