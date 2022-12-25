import styles from './OrderProduct.module.scss'

const OrderProduct = ({ name, amount }) => {
  return (
    <div className={styles.orderProduct}>
      <div className={styles.name}>{name}</div>
      <div className={styles.icon}>X</div>
      <div className={styles.amount}>{amount}</div>
    </div>
  )
}

export default OrderProduct
