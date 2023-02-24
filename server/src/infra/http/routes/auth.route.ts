import { Routes } from '@/interfaces/routes.interface'
import { Router } from 'express'
import validationMiddleware from '@/middlewares/validation.middleware'
import { AuthBody } from '@/infra/dtos/register-body'
import { AuthController } from '@/infra/http/controllers/auth.controller'
import authMiddleware from '@/middlewares/auth.middleware'

export class AuthRoute implements Routes {
  public path = '/auth'
  public router = Router()
  public authController = new AuthController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(
      `/register`,
      validationMiddleware(AuthBody, 'body'),
      this.authController.register
    )

    this.router.post(
      `/login`,
      validationMiddleware(AuthBody, 'body'),
      this.authController.login
    )

    this.router.get(`/refreshToken`, this.authController.refreshToken)

    this.router.get(`/protected`, authMiddleware, (req, res) =>
      res.json({ success: true })
    )

    this.router.get(`/validateToken`, authMiddleware, (req, res) =>
      res.json({ success: true })
    )
  }
}
