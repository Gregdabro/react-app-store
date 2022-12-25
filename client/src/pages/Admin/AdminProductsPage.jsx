import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  isLoadingProductSelector,
  productListSelector,
  removeProduct
} from '../../store/productSlice'
import { paginate } from '../../utils/paginate'
import Pagination from '../../components/UI/Pagination/Pagination'
import { useProductsFilter } from '../../hooks/useProductsFilter'
import Filter from '../../components/Filter/Filter'
import ProductsTable from '../../components/Admin/ProductsTable'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import AdminNavbar from '../../components/Admin/AdminNavbar'

const ProductListPage = () => {
  const dispatch = useDispatch()
  const productList = useSelector(productListSelector())
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 9
  const isProductLoading = useSelector(isLoadingProductSelector())
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const sortedAndSearchedProducts = useProductsFilter(
    productList,
    filter.sort,
    filter.query
  )
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const navigate = useNavigate()
  const handleEdit = (id) => {
    navigate(id)
  }

  const handleDelete = (productId) => {
    dispatch(removeProduct(productId))
  }

  const count = sortedAndSearchedProducts.length
  const productsCrop = paginate(
    sortedAndSearchedProducts,
    currentPage,
    pageSize
  )
  return (
    <>
      <AdminNavbar title="Product List" label="add new" path="add-product" />
      <Filter
        filter={filter}
        setFilter={setFilter}
        options={[
          { value: 'name', name: 'По названию' },
          { value: 'category', name: 'По категории' }
        ]}
      />
      <div style={{ minHeight: 600 }}>
        {!isProductLoading && sortedAndSearchedProducts.length === 0 ? (
          <p>Нет товаров по условию</p>
        ) : (
          <>
            {isProductLoading ? (
              <Loader />
            ) : (
              <ProductsTable
                products={productsCrop}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            )}
          </>
        )}
      </div>
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default ProductListPage
