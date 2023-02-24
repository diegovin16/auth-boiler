import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import { SECRET_KEY } from '@/config'
import { UserRepository } from '@/application/repositories/user-repository'
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/prisma-user.repository'
import { RequestWithUser } from '@/interfaces/auth.interface'
import { AuthErrors, AuthException } from '@/exceptions/AuthException'

const unauthorized = (res: Response) =>
  res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ message: AuthErrors.INVALID_TOKEN })

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  let { access_token } = req.cookies
  if (!access_token) {
    access_token = req.headers.access_token
  }
  if (!access_token) {
    throw AuthException.invalidToken()
  }
  let data = { id: '', ip: '' }
  try {
    const isValidToken: any = verify(access_token, SECRET_KEY)
    if (!isValidToken) {
      return unauthorized(res)
    }
    data = isValidToken.data
  } catch {
    return unauthorized(res)
  }
  if (data.ip !== req.ip) {
    throw AuthException.invalidToken()
  }
  const userRepository = new PrismaUserRepository()
  req.user = await userRepository.findById(data.id)

  next()
}

export default authMiddleware
