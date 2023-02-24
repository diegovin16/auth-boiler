import styles from './Input.module.css'

export function Input({ error, ...rest }: any) {
  let classes = styles.input
  if (error) {
    classes += ` ${styles.error}`
  }
  return <input className={classes} {...rest} />
}
