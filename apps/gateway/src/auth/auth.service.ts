import { PrismaService } from '@app/modules'
import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async user(input: Prisma.UserWhereUniqueInput): Promise<User | undefined> {
    return this.prismaService.user.findUnique({
      where: input,
    })
  }
}
