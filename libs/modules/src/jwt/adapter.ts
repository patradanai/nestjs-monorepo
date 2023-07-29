export abstract class IJwtService {
  abstract compare<T extends Record<string, unknown>>(token: string): T
  abstract sign(userId: number, expiredIn: string): Promise<string>
}
