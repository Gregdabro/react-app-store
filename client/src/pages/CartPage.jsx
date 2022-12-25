import PageHeader from '../components/Admin/PageHeader/PageHeader'
import styles from '../components/Cart/Cart.module.scss'
import { Outlet } from 'react-router-dom'

const CartPage = () => {
  return (
    <>
      <PageHeader title="cart" subTitle="Leather Belt" isBackButton={true} />
      <div className={styles.cart}>
        <Outlet />
      </div>
    </>
  )
}

export default CartPage
