import styles from './ProductList.module.scss'
import IMAGES from '../../constants/images'
import { HiOutlineHeart } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const ProductList = ({ children }) => {
  return <div className={styles.productList}>{children}</div>
}

const ProductItem = ({ item }) => {
  return (
    <div key={item._id} className={styles.productCard}>
      <div className={styles.cardBanner}>
        <img
          src={IMAGES[item.image]}
          alt="pic"
          className={styles.imageContain}
        />

        <div className={styles.cardBadge}>Popular</div>

        <div className={styles.cardAction}>
          <button className={styles.cardActionBtn}>
            <HiOutlineHeart />
          </button>
        </div>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>
          <Link to={item._id}>{item.name}</Link>
        </h3>
        <div className={styles.cardPrice}>
          <span>€ {item.price}</span>
        </div>
      </div>
    </div>
  )
}

ProductList.Item = ProductItem

export default ProductList
