import { Module } from '@nestjs/common'

import { EnvService } from '../globals/env'
import { ICacheService } from './adapter'
import { CacheService } from './cache.service'

@Module({
  imports: [],
  providers: [
    {
      provide: ICacheService,
      useFactory: (envService: EnvService) => {
        return new CacheService(envService.REDIS_URL)
      },
      inject: [EnvService],
    },
  ],
  exports: [ICacheService],
})
export class CacheModule {}
