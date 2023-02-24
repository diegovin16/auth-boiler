import { User } from '@/application/entities/user'
import { User as RawUser } from '@prisma/client'
import { Password } from '@/application/entities/password'

export class PrismaUserMapper {
  static toPrisma(user: User): RawUser {
    return {
      password: user.password,
      email: user.email,
      id: user.id,
      createdAt: user.createdAt,
    }
  }

  static toDomain(user: RawUser): User {
    return new User(
      {
        email: user.email,
        password: new Password(user.password, true),
        createdAt: user.createdAt,
      },
      user.id
    )
  }
}
