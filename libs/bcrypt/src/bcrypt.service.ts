import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptService {
  private saltonRounds = 10

  async hash(plainPwd: string): Promise<string> {
    const hash = await bcrypt.hash(plainPwd, this.saltonRounds)
    return hash
  }

  async comparing(plainPwd: string, hashedPwd: string): Promise<boolean> {
    return await bcrypt.compare(plainPwd, hashedPwd)
  }
}
