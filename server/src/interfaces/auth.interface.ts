import { Request } from 'express'
import { User } from '@/application/entities/user'

export interface RequestWithUser extends Request {
  user: User
}
