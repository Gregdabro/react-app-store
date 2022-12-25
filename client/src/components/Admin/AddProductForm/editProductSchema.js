import * as Yup from 'yup'

export const editProductSchema = Yup.object({
  name: Yup.string().required('Required'),
  price: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  colors: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string(),
        value: Yup.string()
      })
    )
    .min(1, 'Required')
})
