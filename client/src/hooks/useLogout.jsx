import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
const useLogout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () =>
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate('/', { replace: true })
      })
      .catch(() => {
        window.location.reload()
      })
  return handleLogout
}

export default useLogout
