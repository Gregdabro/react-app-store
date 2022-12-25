import styles from './Cart.module.scss'
import Button from '../UI/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import {
  cartItemsSelector,
  cartTotalSelector,
  clearCart
} from '../../store/cartSlice'
import CartItem from './CartItem'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { clearMessage } from '../../store/messageSlice'
import { createOrder } from '../../store/orderSlice'

const Cart = () => {
  const cartItems = useSelector(cartItemsSelector())
  const total = useSelector(cartTotalSelector())
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [successful, setSuccessful] = useState(false)
  const { message } = useSelector((state) => state.message)

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const handleCreateOrder = () => {
    const order = {
      products: [
        ...cartItems.map(({ _id: productId, ...rest }) => ({
          productId,
          ...rest
        }))
      ],
      total
    }
    dispatch(createOrder({ payload: { ...order } }))
      .unwrap()
      .then(() => {
        clearCart()
        navigate('/')
        dispatch(clearCart())
      })
      .catch(() => {
        setSuccessful(false)
      })
      .finally(() => {})
  }

  useEffect(() => {
    dispatch(clearMessage())
  }, [dispatch])

  return (
    <div className={styles.cart}>
      {!successful && (
        <>
          <div className={styles.top}>
            {cartItems.length !== 0 ? (
              <h1>Products in your cart</h1>
            ) : (
              <h1>В корзине нет товара</h1>
            )}
          </div>
          <div className={styles.middle}>
            {cartItems?.map((item) => (
              <CartItem key={item._id} {...item} />
            ))}
            <div className={styles.total}>
              <p>Total</p>
              <span>${total}</span>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.wrapper}>
              <Button onClick={() => handleClearCart()}>Remove Cart</Button>
              <Button onClick={() => handleCreateOrder()}>
                proceed to checkout
              </Button>
            </div>
          </div>
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  )
}

export default Cart
