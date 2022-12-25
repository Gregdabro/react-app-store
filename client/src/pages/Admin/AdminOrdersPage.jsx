import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { paginate } from '../../utils/paginate'
import Pagination from '../../components/UI/Pagination/Pagination'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import {
  orderListSelector,
  orderLoadingSelector,
  removeOrder
} from '../../store/orderSlice'
import OrdersTable from '../../components/Admin/OrdersTable'

const UsersListPage = () => {
  const dispatch = useDispatch()
  const orderList = useSelector(orderListSelector())
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 9
  const isOrdersLoading = useSelector(orderLoadingSelector())
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const navigate = useNavigate()
  const handleEdit = (id) => {
    navigate(id)
  }

  const handleDelete = (orderId) => {
    dispatch(removeOrder(orderId))
  }

  const count = orderList.length
  const ordersCrop = paginate(orderList, currentPage, pageSize)
  return (
    <>
      <AdminNavbar title="Orders List" isBackButton={true} />
      <div style={{ minHeight: 600 }}>
        {!isOrdersLoading && orderList.length === 0 ? (
          <p>Нет товаров по условию</p>
        ) : (
          <>
            {isOrdersLoading ? (
              <Loader />
            ) : (
              <OrdersTable
                orders={ordersCrop}
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

export default UsersListPage
