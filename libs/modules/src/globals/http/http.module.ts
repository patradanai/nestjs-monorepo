import { HttpModule as HttpAxios, HttpService } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { EnvModule, EnvService } from '../env'

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
