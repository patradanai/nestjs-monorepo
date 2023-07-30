import { EnvModule, LoggerModule, PrismaModule } from '@app/modules'
import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'

@Module({
  imports: [EnvModule, AuthModule, PrismaModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
