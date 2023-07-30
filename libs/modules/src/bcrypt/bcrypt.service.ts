import { Inject, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { SALT_ROUND } from './bcrypt.module'

@Injectable()
export class BcryptService {
  constructor(@Inject(SALT_ROUND) private round: number) {}

  async hash(plainPwd: string): Promise<string> {
    return await bcrypt.hash(plainPwd, this.round)
  }

  async comparing(plainPwd: string, hashedPwd: string): Promise<boolean> {
    return await bcrypt.compare(plainPwd, hashedPwd)
  }
}
