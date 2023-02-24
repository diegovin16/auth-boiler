import Head from 'next/head'
import { Poppins } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import authService from '@/services/auth.service'
import { Header } from '@/components/Login/Header'
import { useState } from 'react'
import { Login } from '@/screens/Login'
import { Register } from '@/screens/Register'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const poppins_400 = Poppins({ subsets: ['latin'], weight: '400' })

export default function Home() {
  const [page, setPage] = useState('login')
  const [email, setEmail] = useState('diego2@asd.com')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const router = useRouter()

  const togglePage = () =>
    setPage((prev) => (prev === 'login' ? 'register' : 'login'))

  const handleSubmit = async (data: {
    type: 'login' | 'register'
    email: string
    password: string
  }) => {
    setLoading(true)
    setError(false)

    if (data.type === 'login') {
      await authService
        .login(data.email, data.password)
        .then(() => router.push('/dashboard'))
        .catch(() => {
          toast.error('Email or password invalid.')
          setError(true)
        })
    }
    if (data.type === 'register') {
      await authService.register(data.email, data.password)
      setPage('login')
    }
    setLoading(false)
  }
  return (
    <>
      <Head>
        <title>Auth Boilerplate</title>
        <meta name="description" content="Auth Boilerplate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container + ' ' + poppins_400.className}>
        <Header />
        <div className={styles['form-wrapper']}>
          <div className={styles.form}>
            {page === 'login' ? (
              <Login
                loading={loading}
                togglePage={togglePage}
                handleSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                error={error}
              />
            ) : page === 'register' ? (
              <Register
                loading={loading}
                togglePage={togglePage}
                handleSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                error={error}
              />
            ) : null}
          </div>
        </div>
        <div className={styles.image}>
          <div className={styles['image-circle']}></div>
          <div className={styles.acrylic}></div>
        </div>
      </main>
    </>
  )
}
