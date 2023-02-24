import { HttpException } from '@/exceptions/HttpException'
import { StatusCodes } from 'http-status-codes'

export enum AuthErrors {
  EMAIL_OR_PASSWORD_INVALID = 'Email or password invalid.',
  ALREADY_EXISTS = 'User already exists with this email.',
  INVALID_TOKEN = 'Invalid token.',
}

export class AuthException {
  static invalidCredentials() {
    return new HttpException(
      StatusCodes.UNAUTHORIZED,
      AuthErrors.EMAIL_OR_PASSWORD_INVALID
    )
  }
  static alreadyExists() {
    return new HttpException(StatusCodes.BAD_REQUEST, AuthErrors.ALREADY_EXISTS)
  }
  static invalidToken() {
    return new HttpException(StatusCodes.UNAUTHORIZED, AuthErrors.INVALID_TOKEN)
  }
}
