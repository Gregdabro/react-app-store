import styles from './PageHeader.module.scss'

const TitlePage = ({ children }) => {
  return <div className={styles.titlePage}>{children}</div>
}

export default TitlePage
