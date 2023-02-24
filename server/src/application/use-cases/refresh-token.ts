import { UserRepository } from '@/application/repositories/user-repository'
import redis from '@/lib/redis'
import { AuthException } from '@/exceptions/AuthException'
import jwt from 'jsonwebtoken'
import { Login, SessionType } from '@/application/use-cases/login'

interface RefreshTokenRequest {
  refresh_token: string
  access_token: string
}

interface RefreshTokenResponse {
  session: SessionType
}

export class RefreshToken {
  constructor(private userRepository: UserRepository) {}

  async execute(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const { refresh_token: refreshToken, access_token: accessToken } = request

    const { data }: any = jwt.decode(accessToken)
    const userId = data?.id

    if (!userId || !data) {
      throw AuthException.invalidToken()
    }

    const result = await redis.get(`${userId}-${data.ip}`)

    if (!result || result !== refreshToken) {
      throw AuthException.invalidToken()
    }

    const access_token = Login.createAccessToken({ id: userId, ip: data.ip })
    const refresh_token = await Login.createRefreshToken(userId, data.ip)

    return {
      session: {
        access_token,
        refresh_token,
      },
    }
  }
}
