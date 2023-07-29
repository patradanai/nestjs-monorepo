import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IEnvService } from './adapter'

@Injectable()
export class EnvService implements IEnvService {
  constructor(private configuration: ConfigService) {}

  ENVIRONMENT = this.configuration.get<string>('ENVIRONMENT')
  PORT = this.configuration.get<number>('PORT')
  HTTP_TIMEOUT = this.configuration.get<number>('HTTP_TIMEOUT')
  HTTP_MAX_REDIRECTS = this.configuration.get<number>('HTTP_MAX_REDIRECTS')

  JWT_EXPIRES_IN = this.configuration.get<string>('JWT_EXPIRES_IN')
  JWT_SECRET = this.configuration.get<string>('JWT_SECRET')

  REDIS_URL = this.configuration.get<string>('REDIS_URL')
}
