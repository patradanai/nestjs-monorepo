import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { IJwtService } from './adapter'

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private jwtService: JwtService) {}

  compare<T extends Record<string, unknown>>(token: string): T {
    return this.jwtService.decode(token) as T
  }

  async sign(userId: number, expiredIn: string): Promise<string> {
    return await this.jwtService.signAsync(
      { userId: userId },
      { expiresIn: expiredIn },
    )
  }
}
