import { PrismaModule } from '@app/modules'
import { Module } from '@nestjs/common'

import { AuthService } from './auth.service'

@Module({
  imports: [PrismaModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
