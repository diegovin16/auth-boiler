import { Password } from './password'

describe('Password', () => {
  it('should be able to create a password with valid length', () => {
    expect(() => new Password('123456')).toBeTruthy()
  })

  it('should not be able to create a password with invalid length', () => {
    expect(() => new Password('123')).toThrow()
  })

  it('should hash password', () => {
    const password = 'test-password'
    const result = new Password(password)

    expect(result).toBeTruthy()
    expect(result.hash).not.toBe(password)
  })

  it('should hash a password and compare equal', () => {
    const password = 'test-password'
    const result = new Password(password)
    const hash = result.hash

    expect(Password.comparePassword(password, hash)).toBeTruthy()
  })
})
