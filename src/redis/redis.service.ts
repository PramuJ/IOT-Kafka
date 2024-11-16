import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {

    constructor(@InjectRedis() private redis: Redis) {}

    

    async cacheList(key: string, data: any, ttl: number) {

     let maxlength = 0;

     switch(key.charAt(key.length - 1)) {
        case '0':
            maxlength = 7200;
            break;
        case '1':
            maxlength = 3600;
            break;
        case '2':
            maxlength = 720;
            break;
        
        default:
     }



        const pipeline = this.redis.pipeline();
        pipeline.rpush(key,data);
        pipeline.ltrim(key, -maxlength, -1);
        pipeline.expire(key,ttl);
        await pipeline.exec();
    }


    async readListFromCache(key: string ) {
        return await this.redis.lrange(key, 0, -1);
    }
}


