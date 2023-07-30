import { Global, Module } from '@nestjs/common'

import { EnvModule } from './env/'
import { HttpModule } from './http'
import { LoggerModule } from './logger'

const providers = [HttpModule, LoggerModule, EnvModule]

@Global()
@Module({
  providers,
  imports: [...providers],
  exports: [...providers],
})
export class SharedModule {}
