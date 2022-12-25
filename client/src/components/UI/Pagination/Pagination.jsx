import _ from 'lodash'
import styles from './Pagination.module.scss'
const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize)
  const pages = _.range(1, pagesCount + 1)

  if (pagesCount === 1) return null
  return (
    <nav style={{ marginTop: 'auto' }}>
      <ul className={styles.pagination}>
        {pages.map((page) => (
          <li
            key={page}
            className={
              `${styles.pageItem}` +
              (page === currentPage
                ? `${styles.pageItem} ${styles.pageActive}`
                : '')
            }
          >
            <button
              onClick={() => {
                onPageChange(page)
              }}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
