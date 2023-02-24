import { UserRepository } from '@/application/repositories/user-repository'
import { User } from '@/application/entities/user'
import { PrismaClient } from '@prisma/client'
import { PrismaUserMapper } from '@/infra/database/prisma/mappers/prisma-user-mapper'

export class PrismaUserRepository implements UserRepository {
  private prisma = new PrismaClient().user

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.prisma.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async save(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user)

    await this.prisma.upsert({
      where: {
        id: raw.id,
      },
      update: raw,
      create: raw,
    })
  }
}
