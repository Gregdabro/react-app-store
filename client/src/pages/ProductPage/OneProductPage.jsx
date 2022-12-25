import { useDispatch, useSelector } from 'react-redux'
import {
  isLoadingProductSelector,
  productSelector
} from '../../store/productSlice'
import PageHeader from '../../components/Admin/PageHeader/PageHeader'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import styles from './Product.module.scss'
import IMAGES from '../../constants/images'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import Button from '../../components/UI/Button/Button'
import { addProduct } from '../../store/cartSlice'

const ProductListPage = () => {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const [amount, setAmount] = useState(1)
  const product = useSelector(productSelector(productId))
  const isProductLoading = useSelector(isLoadingProductSelector())
  const handleAddToCart = (product) => {
    dispatch(addProduct({ ...product, amount }))
    setAmount(1)
  }

  const handleQuantity = (type) => {
    if (type === 'decrement') {
      amount > 1 && setAmount(amount - 1)
    } else {
      setAmount(amount + 1)
    }
  }

  return (
    <>
      <PageHeader title="catalog" subTitle="Leather Belts" />
      <div style={{ minHeight: 600 }}>
        {!isProductLoading && product && (
          <div className={styles.product}>
            <div className={styles.left}>
              <div className={styles.mainImg}>
                <img src={IMAGES[product.image]} />
              </div>
            </div>
            <div className={styles.right}>
              <h1>{product.name}</h1>
              <p className={styles.price}> $ {product.price}</p>
              <p>{product.description}</p>
              <div className={styles.amount}>
                <button onClick={() => handleQuantity('decrement')}>
                  <AiOutlineMinus />
                </button>
                <span>{amount}</span>
                <button onClick={() => handleQuantity('increment')}>
                  <AiOutlinePlus />
                </button>
              </div>
              <Button onClick={() => handleAddToCart(product)}>
                add to cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProductListPage
