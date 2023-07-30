import { Module } from '@nestjs/common'

import { BcryptService } from './bcrypt.service'

@Module({
  providers: [
    BcryptService,
    {
      provide: 'SALT_ROUND',
      useValue: 10,
    },
  ],
  exports: [BcryptService],
})
export class BcryptModule {}
