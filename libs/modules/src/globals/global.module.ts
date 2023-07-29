import { Global, Module } from '@nestjs/common'
import { LoggerModule } from './logger'
import { EnvModule } from './env/'
import { HttpModule } from './http'

const providers = [HttpModule, LoggerModule, EnvModule]

@Global()
@Module({
  providers,
  imports: [...providers],
  exports: [...providers],
})
export class SharedModule {}
