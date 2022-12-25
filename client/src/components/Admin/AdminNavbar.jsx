import styles from './Admin.module.scss'
import BackButton from '../UI/BackButton/BackButton'
import { Link } from 'react-router-dom'

const AdminNavbar = ({ title, isBackButton, path, label }) => {
  return (
    <div className={styles.navbar}>
      <h2>{title}</h2>
      {isBackButton ? (
        <BackButton>Go Back</BackButton>
      ) : (
        <Link to={path} className={styles.link}>
          {label}
        </Link>
      )}
    </div>
  )
}

export default AdminNavbar
