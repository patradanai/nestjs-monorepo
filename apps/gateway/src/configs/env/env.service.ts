import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EnvService {
  constructor(private configuration: ConfigService) {}

  get Port(): boolean {
    return this.configuration.get('PORT')
  }
}
