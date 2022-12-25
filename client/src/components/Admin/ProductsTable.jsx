import Category from '../UI/Category/Category'
import ColorList from '../UI/ColorList/ColorList'
import ActionButton from '../UI/ActionButton/ActionButton'
import Table from '../common/table/Table'
import Image from '../UI/Image/Image'

const ProductsTable = ({ products, onDelete, onEdit }) => {
  const columns = {
    id: {
      path: '_id',
      name: 'ID'
    },
    image: {
      name: 'Image',
      component: (product) => <Image path={product.image} />
    },
    name: {
      path: 'name',
      name: 'OrderProduct Name'
    },
    description: {
      path: 'description',
      name: 'Description'
    },
    category: {
      name: 'Category',
      component: (product) => <Category id={product.category} />
    },
    colors: {
      name: 'Colors',
      component: (product) => <ColorList colors={product.colors} />
    },
    price: {
      path: 'price',
      name: 'Price'
    },
    actions: {
      name: '#',
      component: (product) => (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'nowrap' }}>
          <ActionButton action="REMOVE" onClick={() => onDelete(product._id)} />
          <ActionButton action="UPDATE" onClick={() => onEdit(product._id)} />
        </div>
      )
    }
  }
  return (
    <>
      <Table columns={columns} data={products} />
    </>
  )
}

export default ProductsTable
