import { EnvModule, EnvService } from '@app/modules'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { JwtTokenService } from './jwt.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [EnvModule],
      useFactory(env: EnvService) {
        return {
          secret: env.JWT_SECRET,
          signOptions: {
            expiresIn: env.JWT_EXPIRES_IN,
          },
        }
      },
      inject: [EnvService],
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
