import styles from './Cart.module.scss'
import { Link } from 'react-router-dom'

const CartSuccess = () => {
  return (
    <div className={styles.cart}>
      <div>Ваш заказ принят</div>
      <Link to="/">Продолжить покупки</Link>
    </div>
  )
}

export default CartSuccess
