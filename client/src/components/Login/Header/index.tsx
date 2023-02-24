import styles from './Header.module.css'
import { Poppins } from '@next/font/google'

const poppins_600 = Poppins({ subsets: ['latin'], weight: '600' })
export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.circle}></div>
      <p className={poppins_600.className}>Untitled UI</p>
    </div>
  )
}
