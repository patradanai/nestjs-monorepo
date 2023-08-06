import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';

import { ICacheInMemoryService } from './adapter';
import { CacheInMemoryService } from './service';

@Global()
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: ICacheInMemoryService,
      useClass: CacheInMemoryService,
    },
  ],
  exports: [ICacheInMemoryService],
})
export class CacheInMemoryModule {}
