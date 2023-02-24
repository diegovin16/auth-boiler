import * as bcrypt from 'bcrypt'
import { PasswordException } from '@/exceptions/PasswordException'

export class Password {
  readonly hash: string
  private salt = 10

  private static validatePasswordLength(password: string): boolean {
    return password.length >= 6
  }

  static comparePassword(password: string, compare: string) {
    return bcrypt.compareSync(password, compare)
  }

  constructor(password: string, isHash?: boolean) {
    const isPasswordLengthValid = Password.validatePasswordLength(password)

    if (!isPasswordLengthValid) {
      throw PasswordException.invalidLength()
    }

    this.hash = isHash ? password : bcrypt.hashSync(password, this.salt)
  }
}
