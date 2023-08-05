import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'

import { ICacheInMemoryService } from './adapter'

@Injectable()
export class CacheInMemoryService implements ICacheInMemoryService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async get(key: string): Promise<unknown> {
    const result = await this.cacheManager.get(key)

    if (!result) throw new Error(`key ${key} not found`)

    return result
  }

  async set(
    key: string,
    value: string | number | Buffer,
    ttl: number = 0,
  ): Promise<void> {
    try {
      await this.cacheManager.set(key, value, ttl)
    } catch (error) {
      throw new Error(`key ${key} can't set value, errror: ${error?.message}`)
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.cacheManager.del(key)
    } catch (error) {
      throw new Error(`key ${key} can't delete, error :${error?.message}`)
    }
  }

  async reset(): Promise<void> {
    await this.cacheManager.reset()
  }
}
