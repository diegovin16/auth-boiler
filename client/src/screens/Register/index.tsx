import styles from '@/screens/Login/Login.module.css'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Poppins } from '@next/font/google'
import { useState } from 'react'
const poppins_400 = Poppins({ subsets: ['latin'], weight: '400' })
const poppins_500 = Poppins({ subsets: ['latin'], weight: '500' })
const poppins_300 = Poppins({ subsets: ['latin'], weight: '300' })
export function Register({
  handleSubmit,
  togglePage,
  loading,
  email,
  setEmail,
  error,
}: any) {
  const [password, setPassword] = useState('')

  const submit = (e: any) => {
    e.preventDefault()
    handleSubmit({
      type: 'register',
      email,
      password,
    })
  }
  return (
    <>
      <h1 className={poppins_400.className}>Sign up</h1>
      <p className={poppins_300.className}>
        Please enter your details to register.
      </p>
      <form onSubmit={submit}>
        <div className={styles['form-control']}>
          <label htmlFor={'email-field'} className={poppins_500.className}>
            Email
          </label>
          <Input
            error={error}
            value={email}
            onChange={(v: any) => setEmail(v.target.value)}
            type={'email'}
            required={true}
            placeholder={'Enter your email'}
            id={'email-field'}
          />
        </div>
        <div className={styles['form-control']}>
          <label htmlFor={'password-field'} className={poppins_500.className}>
            Password
          </label>
          <Input
            error={error}
            type={'password'}
            value={password}
            onChange={(v: any) => setPassword(v.target.value)}
            required={true}
            placeholder={'******'}
            id={'password-field'}
          />
        </div>
        <Button variant={'main'} isLoading={loading}>
          Sign up
        </Button>
      </form>
      <p
        style={{
          textAlign: 'center',
          fontWeight: 400,
          fontSize: '0.9rem',
          marginTop: '1rem',
        }}
      >
        Already member?{' '}
        <span onClick={togglePage} className={styles.link}>
          Sign in
        </span>
      </p>
    </>
  )
}
