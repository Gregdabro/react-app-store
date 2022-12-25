import styles from './AddProduct.module.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearMessage } from '../../../store/messageSlice'
import { FormikProvider, useFormik } from 'formik'
import TextField from '../../common/form/TextInput/TextInput'
import Button from '../../UI/Button/Button'
import { categoryListSelector } from '../../../store/categorySlice'
import { createProduct } from '../../../store/productSlice'
import { colorListSelector } from '../../../store/colorSlice'
import CustomSelect from '../../common/form/select/CustomSelect'
import MultiSelectField from '../../common/form/select/CustomMultiSelect'
import AdminNavbar from '../AdminNavbar'
import { addProductSchema } from './addProductSchema'

const initialValues = {
  name: '',
  image: '',
  category: '',
  price: '',
  description: '',
  colors: []
}

const AddProductForm = () => {
  const [loading, setLoading] = useState(false)
  const [successful, setSuccessful] = useState(false)
  const { message } = useSelector((state) => state.message)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const categories = useSelector(categoryListSelector())
  const categoriesList = categories.map((c) => ({
    label: c.name,
    value: c._id
  }))

  const colors = useSelector(colorListSelector())
  const colorsList = colors.map((c) => ({
    label: c.name,
    value: c._id
  }))

  useEffect(() => {
    dispatch(clearMessage())
  }, [dispatch])

  const handleSubmit = (formValues) => {
    const data = formValues
    setLoading(true)
    setSuccessful(false)

    dispatch(
      createProduct({
        ...data,
        colors: data.colors.map((c) => c.value),
        image: 'bakers_bridle'
      })
    )
      .unwrap()
      .then(() => {
        setSuccessful(true)
        navigate('/admin')
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
    validationSchema: addProductSchema,
    onSubmit: handleSubmit
  })
  return (
    <>
      <AdminNavbar title="Add new OrderProduct" isBackButton={true} />
      <div className={styles.addNewProduct}>
        <FormikProvider value={formik}>
          {!successful && (
            <form onSubmit={formik.handleSubmit}>
              <div className={styles.select}>
                <CustomSelect
                  onChange={(value) =>
                    formik.setFieldValue('category', value.value)
                  }
                  value={formik.values.category}
                  options={categoriesList}
                  name="category"
                  label="Choose category"
                />
              </div>
              {formik.errors.category ? (
                <div className="error">{formik.errors.category}</div>
              ) : null}
              <MultiSelectField
                options={colorsList}
                onChange={(value) =>
                  formik.setFieldValue('colors', value.value)
                }
                name="colors"
                label="Choose colors"
              />
              {formik.errors.colors ? (
                <div className="error">{formik.errors.colors}</div>
              ) : null}
              <TextField label="Name" name="name" />
              <TextField label="Description" name="description" />
              <TextField label="Price" name="price" />
              <TextField label="Image" name="image" />
              <Button disabled={loading}>Create</Button>
            </form>
          )}
          {message && (
            <div className={styles.error}>
              <p>{message}</p>
            </div>
          )}
        </FormikProvider>
      </div>
    </>
  )
}

export default AddProductForm
