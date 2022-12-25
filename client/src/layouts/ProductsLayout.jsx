import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { getProducts } from '../store/productSlice'
import { getCategories } from '../store/categorySlice'
import { useDispatch } from 'react-redux'

const ProductsLayout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const loadProductData = () => {
      dispatch(getProducts())
      dispatch(getCategories())
    }
    loadProductData()
  }, [dispatch])

  return <Outlet />
}

export default ProductsLayout
