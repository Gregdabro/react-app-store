import { useSelector } from 'react-redux'
import {
  categoryLoadingSelector,
  categorySelector
} from '../../../store/categorySlice'

const Category = ({ id }) => {
  const category = useSelector(categorySelector(id))
  const isLoading = useSelector(categoryLoadingSelector())
  return <>{!isLoading ? <p>{category?.name}</p> : 'Loading...'}</>
}

export default Category
