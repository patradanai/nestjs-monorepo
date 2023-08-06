import { PrismaService } from '@app/modules';
import { IKafkaService } from '@app/modules/kafka/adapter';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private kafakaClient: IKafkaService,
  ) {}

  async user(input: Prisma.UserWhereUniqueInput): Promise<User | undefined> {
    return this.prismaService.user.findUnique({
      where: input,
    });
  }
}
