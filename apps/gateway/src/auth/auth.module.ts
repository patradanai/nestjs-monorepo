import { KafkaModule, PrismaModule } from '@app/modules';
import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';

@Module({
  imports: [
    PrismaModule,
    KafkaModule.registerAsync({
      useFactory: () => ({
        clientId: 'gateway',
        brokers: ['localhost:9092'],
        groupId: 'gateway',
      }),
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
