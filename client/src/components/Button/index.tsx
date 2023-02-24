import styles from './Button.module.css'

export function Button({ children, variant, isLoading, ...rest }: any) {
  let classes = `${styles.button}`
  if (variant === 'main') {
    classes += ` ${styles.main}`
  }
  if (isLoading) {
    classes += ` ${styles.loading}`
  }
  return (
    <button className={classes} {...rest}>
      {isLoading ? '...' : children}
    </button>
  )
}
