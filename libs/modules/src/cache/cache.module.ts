import { Module } from '@nestjs/common'
import { CacheService } from './cache.service'
import { ICacheService } from './adapter'
import { EnvService } from '../globals/env'
import { LoggerService } from '../globals/logger'

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
