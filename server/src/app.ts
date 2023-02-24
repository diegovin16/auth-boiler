import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { PORT, NODE_ENV, FRONTEND_URL } from '@/config'
import { Routes } from '@/interfaces/routes.interface'
import errorMiddleware from '@/middlewares/error.middleware'

export class App {
  public app: express.Application
  public env: string
  public port: string | number

  constructor(routes: Routes[]) {
    this.app = express()
    this.env = NODE_ENV || 'development'
    this.port = PORT || 4000

    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeErrorHandling()
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: FRONTEND_URL, credentials: true }))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser())
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use(route.path || '/', route.router)
    })
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`======= ENV: ${this.env} ========`)
      console.log(`🚀 App listening on the port ${this.port}`)
      console.log(`=================================`)
    })
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }
}
