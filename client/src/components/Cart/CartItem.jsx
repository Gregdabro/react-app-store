import styles from './Cart.module.scss'
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import IMAGES from '../../constants/images'
import { useDispatch } from 'react-redux'
import { decrease, increase, removeItem } from '../../store/cartSlice'
import ColorList from '../UI/ColorList/ColorList'

const CartItem = ({
  _id: id,
  image,
  name,
  colors,
  amount,
  price,
  description
}) => {
  const dispatch = useDispatch()
  const handleIncrement = (payload) => {
    dispatch(increase(payload))
  }
  const handleDecrement = (payload) => {
    dispatch(decrease(payload))
  }

  const handleRemoveItem = (payload) => {
    dispatch(removeItem(payload))
  }
  return (
    <div className={styles.item} key={id}>
      <div className={styles.itemInfo}>
        <img src={IMAGES[image]} />
        <div className={styles.details}>
          <h2>{name}</h2>
          <p className={styles.size}>{description}</p>
          <ColorList colors={colors} />
        </div>
      </div>
      <div className={styles.quantity}>
        <button className="amount-btn" onClick={() => handleDecrement(id)}>
          <AiOutlineMinus />
        </button>
        <p>{amount}</p>
        <button className="amount-btn" onClick={() => handleIncrement(id)}>
          <AiOutlinePlus />
        </button>
      </div>
      <div className={styles.subTotal}>{`${amount * price}`}</div>
      <button className={styles.delete} onClick={() => handleRemoveItem(id)}>
        <AiOutlineDelete />
      </button>
    </div>
  )
}

export default CartItem
