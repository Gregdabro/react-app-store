import styles from './CategoryBtnList.module.scss'
const CategoryBtnAll = ({ children, selectedItem, onClearFilter }) => {
  return (
    <button
      onClick={onClearFilter}
      className={
        selectedItem !== '' ? `${styles.categoryBtn}` : `${styles.active}`
      }
    >
      {children}
    </button>
  )
}
export default CategoryBtnAll
