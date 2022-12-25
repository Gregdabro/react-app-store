import AuthLayout from './layouts/AuthLayout'
import { Navigate } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import ProductsLayout from './layouts/ProductsLayout'
import ProductListPage from './pages/ProductListPage'
import OneProductPage from './pages/ProductPage/OneProductPage'
import CartPage from './pages/CartPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import Cart from './components/Cart/Cart'
import CartSuccess from './components/Cart/CartSuccess'
import EditProductForm from './components/Admin/AddProductForm/EditProductForm'
import AdminLayout from './layouts/AdminLayout'
import AdminProductsPage from './pages/Admin/AdminProductsPage'
import AddProductForm from './components/Admin/AddProductForm/AddProductForm'
import AdminUsersPage from './pages/Admin/AdminUsersPage'
import AdminOrdersPage from './pages/Admin/AdminOrdersPage'

const routes = (isLoggedIn, location, isAdmin) => [
  {
    path: '',
    element: isLoggedIn ? <ProductsLayout /> : <Navigate to="/auth/login" />,
    children: [
      { path: '', element: <ProductListPage /> },
      { path: ':productId', element: <OneProductPage /> }
    ]
  },
  {
    path: 'admin',
    element:
      isLoggedIn && isAdmin ? (
        <AdminLayout />
      ) : (
        <Navigate to="/auth/login" state={{ referrer: location }} />
      ),
    children: [
      { path: '', element: <AdminProductsPage /> },
      { path: ':productId', element: <EditProductForm /> },
      { path: 'add-product', element: <AddProductForm /> },
      { path: 'users', element: <AdminUsersPage /> },
      { path: 'orders', element: <AdminOrdersPage /> }
    ]
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/auth/signup" />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'signup',
        element: <SignupPage />
      }
    ]
  },
  {
    path: 'cart',
    element: isLoggedIn ? (
      <CartPage />
    ) : (
      <Navigate to="/auth/login" state={{ referrer: location }} />
    ),
    children: [
      {
        path: '',
        element: <Cart />
      },
      {
        path: 'success',
        element: <CartSuccess />
      }
    ]
  },
  {
    path: '/contact',
    element: <ContactPage />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
]

export default routes
