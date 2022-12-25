import OrderProduct from './OrderProduct'
const OrderProductList = ({ products }) => {
  return (
    <div>
      {products.map((prod) => (
        <OrderProduct key={prod._id} {...prod} />
      ))}
    </div>
  )
}

export default OrderProductList
