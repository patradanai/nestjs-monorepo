import { HttpModule as HttpAxios, HttpService } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'

import { EnvModule, EnvService } from '../env'
@Global()
@Module({
  imports: [
    HttpAxios.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        timeout: envService.HTTP_TIMEOUT,
        maxRedirects: envService.HTTP_MAX_REDIRECTS,
      }),
    }),
  ],
  exports: [HttpService],
})
export class HttpModule {}
