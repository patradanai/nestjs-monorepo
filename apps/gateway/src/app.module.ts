import { PrismaModule } from '@app/modules/database'
import { EnvModule } from '@app/modules/globals/env'
import { LoggerModule } from '@app/modules/globals/logger'
import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'

@Module({
  imports: [EnvModule, AuthModule, PrismaModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
