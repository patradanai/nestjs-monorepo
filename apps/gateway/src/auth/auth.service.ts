import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'

import { PrismaService } from '../configs/database/prisma.service'

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async user(input: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: input,
    })
  }
}
