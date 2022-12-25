import styles from './Button.module.scss'

const Button = ({ children, disabled, ...rest }) => {
  return (
    <button disabled={disabled} className={styles.button} {...rest}>
      {children}
    </button>
  )
}

export default Button
