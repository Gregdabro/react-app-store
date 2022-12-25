import styles from './Admin.module.scss'
import { Link } from 'react-router-dom'
import { AiOutlineShop } from 'react-icons/ai'

const Sidebar = () => {
  return (
    <div className={styles.sideBar}>
      <div className={styles.sideBarTop}>
        <span className={styles.logo}>Name Admin</span>
      </div>
      <div className={styles.sideBarMain}>
        <Link to="/admin/users" className={styles.item}>
          <AiOutlineShop className={styles.icon} />
          <span>Users</span>
        </Link>
        <Link to="/admin" className={styles.item}>
          <AiOutlineShop className={styles.icon} />
          <span>Products</span>
        </Link>
        <Link to="/admin/orders" className={styles.item}>
          <AiOutlineShop className={styles.icon} />
          <span>Orders</span>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
