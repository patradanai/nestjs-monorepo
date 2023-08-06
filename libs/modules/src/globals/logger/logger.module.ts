import { Global, Module } from '@nestjs/common'
import { LoggerModule as LoggerModulePino } from 'nestjs-pino'

import { EnvModule, EnvService } from '../env'
import { LoggerService } from './logger.service'

@Global()
@Module({
  imports: [
    LoggerModulePino.forRootAsync({
      imports: [EnvModule],
      useFactory: async (envService: EnvService) => ({
        pinoHttp: {
          level: envService.ENVIRONMENT === 'production' ? 'info' : 'debug',
          transport:
            envService.ENVIRONMENT === 'production'
              ? {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                  },
                }
              : undefined,
        },
      }),
      inject: [EnvService],
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
