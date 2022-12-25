import styles from './Quantity.module.scss'
import { useState } from 'react'

const Quantity = () => {
  const [quantity, setQuantity] = useState(1)
  return (
    <div className={styles.quantity}>
      <button
        onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
      >
        -
      </button>
      <span>{quantity}</span>
      <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
    </div>
  )
}

export default Quantity
