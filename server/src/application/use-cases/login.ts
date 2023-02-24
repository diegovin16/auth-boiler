import { UserRepository } from '@/application/repositories/user-repository'
import { User } from '@/application/entities/user'
import { AuthException } from '@/exceptions/AuthException'
import { SECRET_KEY } from '@/config'
import { sign } from 'jsonwebtoken'
import { Password } from '@/application/entities/password'
import { randomUUID } from 'crypto'
import redis from '@/lib/redis'

export interface SessionType {
  access_token: string
  refresh_token?: string
}

interface LoginUserRequest {
  requestIp: string
  email: string
  password: string
}

interface LoginUserResponse {
  user: User | any
  session: SessionType
}

export class Login {
  constructor(private userRepository: UserRepository) {}

  public static createAccessToken(payload: any): string {
    const secretKey: string = SECRET_KEY
    const expiresIn: number = 10

    return sign({ data: payload }, secretKey, { expiresIn })
  }

  public static async createRefreshToken(userId: string, requestIp: string) {
    const refreshToken = randomUUID()
    const key = `${userId}-${requestIp}`
    await redis.del(key)
    await redis.set(key, refreshToken)
    await redis.expire(key, 60 * 60)
    return refreshToken
  }

  async execute(request: LoginUserRequest): Promise<LoginUserResponse> {
    const { email, password, requestIp } = request
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw AuthException.invalidCredentials()
    }

    const hashedPassword = user.password
    const isValidPassword = Password.comparePassword(password, hashedPassword)
    if (!isValidPassword) {
      throw AuthException.invalidCredentials()
    }

    const access_token = Login.createAccessToken({ id: user.id, ip: requestIp })
    const refresh_token = await Login.createRefreshToken(user.id, requestIp)

    return {
      user,
      session: {
        access_token,
        refresh_token,
      },
    }
  }
}
