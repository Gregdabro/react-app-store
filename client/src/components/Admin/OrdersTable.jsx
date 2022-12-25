import ActionButton from '../UI/ActionButton/ActionButton'
import Table from '../common/table/Table'
import OrderProductList from '../UI/OrderProducts/OrderProductList'

const OrdersTable = ({ orders, onDelete }) => {
  const columns = {
    id: {
      path: '_id',
      name: 'order'
    },
    name: {
      path: 'userName',
      name: 'customer'
    },
    products: {
      name: 'Products',
      component: (order) => <OrderProductList products={order.products} />
    },
    total: {
      path: 'total',
      name: 'Total'
    },
    actions: {
      name: '#',
      component: (order) => (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'nowrap' }}>
          <ActionButton action="REMOVE" onClick={() => onDelete(order._id)} />
        </div>
      )
    }
  }
  return (
    <>
      <Table columns={columns} data={orders} />
    </>
  )
}

export default OrdersTable
