import styles from './BackButton.module.scss'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/solid'
const BackButton = ({ label, children }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(-1)
  }
  return (
    <button onClick={handleClick} className={styles.backButton}>
      <ChevronLeftIcon />
      {children || label}
    </button>
  )
}

export default BackButton
