import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isLoggedInSelector } from '../store/authSlice'

const AuthLayout = () => {
  const isLoggedIn = useSelector(isLoggedInSelector())

  if (isLoggedIn) {
    return <Navigate to="/" />
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        background: 'whitesmoke'
      }}
    >
      <Outlet />
    </div>
  )
}

export default AuthLayout
