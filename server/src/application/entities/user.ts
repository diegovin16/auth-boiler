import { randomUUID } from 'crypto'
import { Replace } from '@/helpers/Replace'
import { Password } from '@/application/entities/password'

interface UserProps {
  email: string
  password: Password
  createdAt: Date
}

export class User {
  readonly _id: string
  private props: UserProps

  constructor(props: Replace<UserProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      email: props.email,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  public get id() {
    return this._id
  }

  public set email(email: string) {
    this.props.email = email
  }

  public get email(): string {
    return this.props.email
  }

  public set password(value: string) {
    this.props.password = new Password(value)
  }

  public get password(): string {
    return this.props.password.hash
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}
