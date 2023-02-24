import { UserRepository } from '@/application/repositories/user-repository'
import { User } from '@/application/entities/user'
import { AuthException } from '@/exceptions/AuthException'
import { Password } from '@/application/entities/password'
interface RegisterUserRequest {
  email: string
  password: string
}

interface RegisterUserResponse {
  user: User | any
}
export class Register {
  constructor(private userRepository: UserRepository) {}
  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    const { email, password } = request

    const alreadyExists = await this.userRepository.findByEmail(email)
    if (alreadyExists) {
      throw AuthException.alreadyExists()
    }

    const user = new User({
      email,
      password: new Password(password),
    })

    await this.userRepository.save(user)

    return { user }
  }
}
