import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProducerService } from 'src/kafka/producer/producer.service';


let productCount = 0;

@Injectable()
export class IotService implements OnModuleInit {
    
    constructor(private readonly producer:ProducerService) {}
    
    private temperatureIntervalId: NodeJS.Timeout;
  private humidityIntervalId: NodeJS.Timeout;
  private productCountIntervalId: NodeJS.Timeout;
    

    private async sendIOTinfo(partition:number,val:number){

        await this.producer.produce({
            topic: 'iot-topic', 
            messages: [
              { value: val.toString(), partition: partition , key: partition.toString() },
            ],
          })
        


    }
    
    async onModuleInit() {
        
        console.log("producer connected")
        this.tempurature();
        this.humidity();
        this.produtCnt();
        
    }


    private tempurature() {
        console.log('tempurature called')
        this.temperatureIntervalId = setInterval(async () => {
            const randomNumber = Math.floor(Math.random() * 11) + 20;
            this.sendIOTinfo(0,randomNumber)
        }, 500);
         
      }

      private humidity() {
        console.log('humidity called')
        this.humidityIntervalId = setInterval(async () => {
            const randomNumber = Math.floor(Math.random() * 51) + 30;
            // console.log('humidity called again')
            this.sendIOTinfo(1,randomNumber)
        }, 1000);
         
      }  

      private produtCnt() {
        console.log('product count called')
        this.productCountIntervalId = setInterval(async () => {
            productCount++
            this.sendIOTinfo(2,productCount)
        }, 5000);
         
      }  

        

}
