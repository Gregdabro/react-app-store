import styles from './Navbar.module.scss'
import IMAGES from '../../constants/images'
import {
  MAIN_ROUTE,
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  AUTH_ROUTE,
  CART_ROUTE
} from '../../utils/consts'
import { useSelector } from 'react-redux'
import useLogout from '../../hooks/useLogout'
import { isAdminSelector, isLoggedInSelector } from '../../store/authSlice'
import { Link, NavLink } from 'react-router-dom'
import { cartItemQuantitiesSelector } from '../../store/cartSlice'
import {
  AiOutlineLogout,
  AiOutlineShopping,
  AiOutlineUser
} from 'react-icons/ai'

const Navbar = () => {
  const isAdmin = useSelector(isAdminSelector())
  const isLoggedIn = useSelector(isLoggedInSelector())
  const quantity = useSelector(cartItemQuantitiesSelector())
  const handleLogout = useLogout()

  return (
    <nav className={`${styles.navbar} container`}>
      <a href="/" className={styles.logo}>
        <img width={60} src={IMAGES.logo3} alt="logo" />
      </a>
      <div className={styles.navLinks}>
        <div>
          <a href={MAIN_ROUTE}>home</a>
        </div>
        <div>
          <a href={MAIN_ROUTE}>shop</a>
        </div>
        <div>
          <a href={ABOUT_ROUTE}>about</a>
        </div>
        <div>
          <NavLink
            to={CONTACT_ROUTE}
            style={({ isActive, isPending }) => {
              return {
                color: isActive ? 'red' : 'inherit'
              }
            }}
            className={({ isActive, isPending }) => {
              return isActive ? 'active' : isPending ? 'pending' : ''
            }}
          >
            contact
          </NavLink>
        </div>
      </div>
      <div className={styles.navLinks}>
        {isLoggedIn ? (
          <div className={styles.logout}>
            <button onClick={handleLogout}>
              <p>logout</p> <AiOutlineLogout />
            </button>
            <>
              {isAdmin && (
                <Link to="/admin">
                  <p>admin</p> <AiOutlineUser />
                </Link>
              )}
            </>
          </div>
        ) : (
          <div>
            <a href={AUTH_ROUTE + '/signup'}>signup</a>
          </div>
        )}
        <div className={styles.cartLink}>
          <a href={CART_ROUTE}>
            <AiOutlineShopping />
            <div className={styles.amountWrapper}>
              <p>{quantity}</p>
            </div>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
