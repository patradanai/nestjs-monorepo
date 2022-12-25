import { LoggerModule } from '@app/logger'
import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './configs/database/prisma.module'
import { EnvModule } from './configs/env/env.module'

@Module({
  imports: [EnvModule, AuthModule, PrismaModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
