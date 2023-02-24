import styles from './Dashboard.module.css'
import { decode } from 'jsonwebtoken'
import { useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import Cookies from 'js-cookie'
import authService from '@/services/auth.service'

const ONE_SECOND_IN_MILLISECONDS = 1000

export function Dashboard() {
  const [renderAgain, setRenderAgain] = useState(false)
  const [differenceInSeconds, setDifferenceInSeconds] = useState(1)

  const isExpired = differenceInSeconds < 0

  const handleProtectedRoute = async () => {
    await authService.protectedRoute().catch(() => null)
  }

  useEffect(() => {
    handleProtectedRoute()
  }, [])

  useEffect(() => {
    const accessToken = Cookies.get('access_token') as string
    const data = decode(accessToken) as any
    const expirationAt = new Date(data?.exp * ONE_SECOND_IN_MILLISECONDS)
    const diff = Math.floor(
      (expirationAt.getTime() - new Date().getTime()) /
        ONE_SECOND_IN_MILLISECONDS
    )
    setDifferenceInSeconds(diff)
    const intervalId = setTimeout(() => {
      setRenderAgain((prev) => !prev)
    }, ONE_SECOND_IN_MILLISECONDS)
    return () => clearInterval(intervalId)
  }, [renderAgain])

  return (
    <div className={styles.dashboard}>
      <p>{isExpired ? 'Token expired!' : null}</p>
      <p>Token expires in {differenceInSeconds} s</p>
      <Button onClick={handleProtectedRoute} variant={'main'}>
        Make an protected request
      </Button>
    </div>
  )
}
