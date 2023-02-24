import { HttpException } from '@/exceptions/HttpException'
import { StatusCodes } from 'http-status-codes'

export enum PasswordErrors {
  INVALID_LENGTH = 'Invalid password length.',
}

export class PasswordException {
  static invalidLength() {
    return new HttpException(StatusCodes.BAD_REQUEST, PasswordErrors.INVALID_LENGTH)
  }
}
