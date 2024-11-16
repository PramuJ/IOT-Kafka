import { Controller, Get } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Controller('iot')
export class IotController {

    constructor(private readonly redis:RedisService){}

    @Get('temperature')
    async getTemp() {
        // Call the method to get messages from Redis
        const messages = await this.redis.readListFromCache('iot-topic:partition:0');
        const firstMinMessages: number[] = messages.slice(-120).map(Number);
        const firstHourMessages: number[] = messages.slice(-7200).map(Number);
        

        // console.log(typeof(firstMinMessage))
        const firstMinAvg = this.calculateAverage(firstMinMessages); 
        const firstHrAvg = this.calculateAverage(firstHourMessages);
        const firstHrMax = this.calculateMax(firstHourMessages)

        return {
          Minavg :  firstMinAvg,
          Hravg: firstHrAvg,
          max: firstHrMax,
        }
      }

      @Get('humidity')
      async getHumidity() {
        const messages = await this.redis.readListFromCache('iot-topic:partition:1');
        const firstMinMessages: number[] = messages.slice(-60).map(Number);
        const firstHourMessages: number[] = messages.slice(-3600).map(Number);
        

        // console.log(typeof(firstMinMessage))
        const firstMinAvg = this.calculateAverage(firstMinMessages); 
        const firstHrAvg = this.calculateAverage(firstHourMessages);
        const firstHrMax = this.calculateMax(firstHourMessages)

        return {
          Minavg :  firstMinAvg,
          Hravg: firstHrAvg,
          max: firstHrMax,
        }
        }
        
        @Get('product')
    async getProduct() {
      const messages = await this.redis.readListFromCache('iot-topic:partition:2');
      const firstMinMessages: number[] = messages.slice(-12).map(Number);
      const firstHourMessages: number[] = messages.slice(-720).map(Number);
      

      // console.log(typeof(firstMinMessage))
      const firstMinAvg = Math.floor(Number(this.calculateAverage(firstMinMessages))); 
      const firstHrAvg = Math.floor(Number(this.calculateAverage(firstHourMessages)));
      const firstHrMax = Math.floor(Number(this.calculateMax(firstHourMessages)));

      return {
        Minavg :  firstMinAvg,
        Hravg: firstHrAvg,
        max: firstHrMax,
      }
      }
      
      
      
      private calculateAverage(values: number[]): string {
        if (values.length === 0) return '0';
        const sum = values.reduce((acc, val) => acc + val, 0);
        return (sum / values.length).toFixed(2);
      }
      
      private calculateMax(values: number[]): number {
        if (values.length === 0) return 0;  // Return 0 if the array is empty
        return Math.max(...values);         // Use Math.max to get the maximum value
      }
      

}




