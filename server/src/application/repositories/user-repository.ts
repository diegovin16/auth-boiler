import { User } from '@/application/entities/user'
import { AuthBody } from '@/infra/dtos/register-body'

export abstract class UserRepository {
  abstract findById(userId: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>

  abstract save(user: User): Promise<void>
}
