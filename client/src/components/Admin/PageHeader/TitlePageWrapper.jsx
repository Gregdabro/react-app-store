import styles from './PageHeader.module.scss'

const TitlePageWrapper = ({ children }) => {
  return <div className={styles.titlePageWrapper}>{children}</div>
}

export default TitlePageWrapper
