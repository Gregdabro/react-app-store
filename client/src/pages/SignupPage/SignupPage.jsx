import { useEffect, useState } from 'react'
import styles from './SignupPage.module.scss'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik, FormikProvider } from 'formik'
import { signup } from '../../store/authSlice'
import { NavLink, useNavigate } from 'react-router-dom'
import TextField from '../../components/common/form/TextInput/TextInput'
import { clearMessage } from '../../store/messageSlice'
import Button from '../../components/UI/Button/Button'

const signUpSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must contain at least 3 symbols')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  age: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  password: Yup.string()
    .min(4, 'Password must contain at least 4 symbols')
    .required('Required')
})

const initialValues = {
  name: '',
  email: '',
  password: '',
  age: '',
  phone: '',
  address: ''
}

const SignupPage = () => {
  const [loading, setLoading] = useState(false)
  const [successful, setSuccessful] = useState(false)
  const { message } = useSelector((state) => state.message)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearMessage())
  }, [dispatch])

  const handleSubmit = (formValues) => {
    const { name, email, password, age, phone, address } = formValues
    setLoading(true)
    setSuccessful(false)

    dispatch(signup({ name, email, password, age, phone, address }))
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
    <div className={styles.signupForm}>
      <div className={styles.formWrapper}>
        <h2>Signup Form</h2>
        <FormikProvider value={formik}>
          {!successful && (
            <form onSubmit={formik.handleSubmit}>
              <TextField label="Name" name="name" />
              <TextField label="Email" name="email" />
              <TextField label="Password" name="password" type="password" />
              <TextField label="Age" name="age" />
              <TextField label="Phone" name="phone" />
              <TextField label="Address" name="address" />
              <Button disabled={loading}>Sign Up</Button>
              <p className={styles.signInlLink}>
                <span> Already have account? </span>
                <NavLink to={'/auth/login'}>Log In</NavLink>
              </p>
            </form>
          )}
          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? 'alert alert-success' : 'alert alert-danger'
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </FormikProvider>
      </div>
    </div>
  )
}

export default SignupPage
