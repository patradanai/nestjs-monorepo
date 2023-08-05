import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'

import { ICacheInMemoryService } from './adapter'
import { CacheInMemoryService } from './service'

@Module({
  imports: [CacheModule.register()],
  providers: [
    {
      provide: ICacheInMemoryService,
      useClass: CacheInMemoryService,
    },
  ],
  exports: [ICacheInMemoryService],
})
export class CacheInMemoryModule {}
