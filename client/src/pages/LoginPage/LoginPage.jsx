import { useEffect, useState } from 'react'
import styles from './LoginPage.module.scss'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { useFormik, FormikProvider } from 'formik'
import { login } from '../../store/authSlice'
import { NavLink, useNavigate } from 'react-router-dom'
import TextField from '../../components/common/form/TextInput/TextInput'
import { clearMessage } from '../../store/messageSlice'

const signUpSchema = Yup.object({
  password: Yup.string()
    .min(4, 'Password must contain at least 4 symbols')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required')
})

const initialValues = {
  email: '',
  password: ''
}

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [successful, setSuccessful] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearMessage())
  }, [dispatch])

  const handleSubmit = (formValues) => {
    const { email, password } = formValues
    setLoading(true)
    setSuccessful(false)
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true)
        navigate('/')
      })
      .catch(() => {
        setSuccessful(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const formik = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: handleSubmit
  })

  return (
    <div className={styles.loginForm}>
      <div className={styles.formWrapper}>
        <h2>Login Form</h2>
        <FormikProvider value={formik}>
          {!successful && (
            <form onSubmit={formik.handleSubmit}>
              <TextField label="Email" name="email" />
              <TextField label="Password" name="password" type="password" />
              <button disabled={loading}>Log In</button>
              <p className={styles.signInlLink}>
                <span> Already have account? </span>
                <NavLink to={'/auth/signup'}>Sign Up</NavLink>
              </p>
            </form>
          )}
        </FormikProvider>
      </div>
    </div>
  )
}

export default LoginPage
