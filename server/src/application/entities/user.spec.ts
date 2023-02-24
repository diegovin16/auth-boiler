import { User } from '@/application/entities/user'
import { Password } from '@/application/entities/password'

describe('User', () => {
  it('should create a valid instance of User', () => {
    const user = new User({
      email: 'diego@asd.com',
      password: new Password('123456'),
    })
    expect(user).toBeInstanceOf(User)
  })
})
