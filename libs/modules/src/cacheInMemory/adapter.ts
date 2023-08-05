export abstract class ICacheInMemoryService {
  abstract get(key: string): Promise<unknown>
  abstract set(
    key: string,
    value: string | number | Buffer,
    ttl: number,
  ): Promise<void>
  abstract del(key: string): Promise<void>
  abstract reset(): Promise<void>
}
