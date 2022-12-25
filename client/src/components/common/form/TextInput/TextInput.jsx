import { useField } from 'formik'
import styles from './TextInput.module.scss'

const TextField = (props) => {
  const [field, meta] = useField(props)
  const displayError = meta.touched && meta.error
  const isValue = meta.value

  return (
    <div className={styles.inputBox}>
      <div className={styles.inputWrapper}>
        <input
          id={props.name}
          {...field}
          {...props}
          type={props.type}
          className={styles.input}
        />
        {props.label && (
          <label
            className={
              displayError || isValue ? styles.labelActive : styles.label
            }
            htmlFor={props.name}
          >
            {props.label}
          </label>
        )}
        {displayError ? <div className={styles.error}>{meta.error}</div> : null}
      </div>
    </div>
  )
}

export default TextField
