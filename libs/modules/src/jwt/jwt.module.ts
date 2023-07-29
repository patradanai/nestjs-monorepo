import { Module } from '@nestjs/common'
import { JwtTokenService } from './jwt.service'
import { JwtModule } from '@nestjs/jwt'
import { EnvModule, EnvService } from '@app/modules/globals/env'

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
