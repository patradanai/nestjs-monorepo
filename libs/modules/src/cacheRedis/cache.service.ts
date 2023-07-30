import { Injectable, Logger } from '@nestjs/common'
import { Redis } from 'ioredis'

import { ICacheService } from './adapter'

@Injectable()
export class CacheService implements ICacheService {
  public client: Redis
  private readonly logger = new Logger(CacheService.name)

  constructor(redisUrl: string) {
    this.client = new Redis(redisUrl)
  }

  async ping(): Promise<void> {
    const pong = await this.client.ping()
    if (pong !== 'PONG') {
      throw new Error('Redis is not connected')
    }
    this.logger.log('Redis is connected')
  }

  async set(key: string, value: string | number | Buffer): Promise<string> {
    return await this.client.set(key, value)
  }

  async get(key: string): Promise<string> {
    const result = await this.client.get(key)

    if (!result) this.logger.warn(`key: ${key} not found.`)

    return result
  }

  async del(key: string): Promise<number> {
    return await this.client.del(key)
  }
}
