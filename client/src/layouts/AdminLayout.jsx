import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProducts } from '../store/productSlice'
import { getCategories } from '../store/categorySlice'
import { getColors } from '../store/colorSlice'
import PageHeader from '../components/Admin/PageHeader/PageHeader'
import styles from '../components/Admin/Admin.module.scss'
import Sidebar from '../components/Admin/Sidebar'
import { getUsers } from '../store/userSlice'
import { getOrders } from '../store/orderSlice'

const AdminLayout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const loadProductData = () => {
      dispatch(getProducts())
      dispatch(getCategories())
      dispatch(getColors())
      dispatch(getUsers())
      dispatch(getOrders())
    }
    loadProductData()
  }, [dispatch])
  return (
    <>
      <PageHeader title="admin" subTitle="Dashboard" />
      <div className={styles.dashBoard}>
        <Sidebar />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AdminLayout
