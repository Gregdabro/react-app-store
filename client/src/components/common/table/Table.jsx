import TableHeader from './TableHeader'
import TableBody from './TableBody'
import styles from './Table.module.scss'

const Table = ({ columns, data, children }) => {
  return (
    <table className={styles.table}>
      {children || (
        <>
          <TableHeader {...{ columns }} />
          <TableBody {...{ columns, data }} />
        </>
      )}
    </table>
  )
}

export default Table
