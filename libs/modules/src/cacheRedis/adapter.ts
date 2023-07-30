import Redis from 'ioredis'

export abstract class ICacheService<T = Redis> {
  abstract client: T
  abstract ping(): Promise<void>
  abstract set(key: string, value: string | number | Buffer): Promise<string>
  abstract get(key: string): Promise<string>
  abstract del(key: string): Promise<number>
}
