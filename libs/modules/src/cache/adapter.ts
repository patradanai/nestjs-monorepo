export abstract class ICacheService {
  abstract ping(): Promise<any>
  abstract set(key: string, value: string | number | Buffer): Promise<string>
  abstract get(key: string): Promise<string>
  abstract del(key: string): Promise<number>
}
