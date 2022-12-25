import styles from './Header.module.scss'
import Navbar from '../Navbar/Navbar'
import useHeightReacher from '../../hooks/useHeightReacher'
const Header = () => {
  const offsetBlurHeight = 60
  const { isReached } = useHeightReacher(offsetBlurHeight)
  return (
    <div
      className={
        !isReached ? styles.header : `${styles.header} ${styles.active}`
      }
    >
      <Navbar />
    </div>
  )
}

export default Header
