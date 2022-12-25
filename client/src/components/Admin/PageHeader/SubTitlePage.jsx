import styles from './PageHeader.module.scss'

const SubTitlePage = ({ children }) => {
  return <div className={styles.subTitlePage}>{children}</div>
}

export default SubTitlePage
