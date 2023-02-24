import { NextFunction, Request, Response } from 'express'
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/prisma-user.repository'
import { Login } from '@/application/use-cases/login'
import { Register } from '@/application/use-cases/register'
import { UserViewModel } from '@/infra/http/view-models/user-view-model'
import { RefreshToken } from '@/application/use-cases/refresh-token'
import { RequestWithUser } from '@/interfaces/auth.interface'

const defaultCookieOptions = {
  secure: true,
  httpOnly: true,
}

export class AuthController {
  private userRepository = new PrismaUserRepository()
  private loginUser = new Login(this.userRepository)
  private registerUser = new Register(this.userRepository)
  private refreshTokenUser = new RefreshToken(this.userRepository)

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const { user } = await this.registerUser.execute({
        email,
        password,
      })

      return res.json({ user: UserViewModel.toHTTP(user) })
    } catch (err) {
      next(err)
    }
  }
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const { user, session } = await this.loginUser.execute({
        email,
        password,
        requestIp: req.ip,
      })
      res.cookie('access_token', session.access_token)
      res.cookie('refresh_token', session.refresh_token, defaultCookieOptions)
      return res.json({
        user: UserViewModel.toHTTP(user),
        session,
      })
    } catch (err) {
      next(err)
    }
  }
  public refreshToken = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let { refresh_token, access_token } = req.cookies
      if (!refresh_token) {
        refresh_token = req.headers.refresh_token
      }
      if (!access_token) {
        access_token = req.headers.access_token
      }

      const { session } = await this.refreshTokenUser.execute({
        refresh_token,
        access_token,
      })

      res.cookie('access_token', session.access_token)
      res.cookie('refresh_token', session.refresh_token, defaultCookieOptions)
      // res.cookie('refresh_token', refresh_token)
      return res.json({ session })
    } catch (err) {
      next(err)
    }
  }
}
