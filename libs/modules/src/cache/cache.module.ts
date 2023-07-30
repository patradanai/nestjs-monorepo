import { Module } from '@nestjs/common'

import { EnvService } from '../globals/env'
import { LoggerService } from '../globals/logger'
import { ICacheService } from './adapter'
import { CacheService } from './cache.service'

@Module({
  imports: [],
  providers: [
    CacheService,
    {
      provide: ICacheService,
      useFactory: (envService: EnvService, loggerService: LoggerService) => {
        return new CacheService(envService.REDIS_URL, loggerService)
      },
      inject: [EnvService, LoggerService],
    },
  ],
  exports: [ICacheService],
})
export class CacheModule {}
