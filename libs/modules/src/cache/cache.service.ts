import { Injectable } from '@nestjs/common'
import { ICacheService } from './adapter'
import { Redis } from 'ioredis'
import { LoggerService } from '../globals/logger'

@Injectable()
export class CacheService implements ICacheService {
  private redis: Redis
  constructor(
    redisUrl: string,
    private readonly logger: LoggerService,
  ) {
    this.redis = new Redis(redisUrl)
  }

  async ping(): Promise<any> {
    const pong = await this.redis.ping()
    if (pong !== 'PONG') {
      throw new Error('Redis is not connected')
    }

    this.logger.log('Redis is connected')
  }

  async set(key: string, value: string | number | Buffer): Promise<string> {
    return await this.redis.set(key, value)
  }

  async get(key: string): Promise<string> {
    return await this.redis.get(key)
  }

  async del(key: string): Promise<number> {
    return await this.redis.del(key)
  }
}
