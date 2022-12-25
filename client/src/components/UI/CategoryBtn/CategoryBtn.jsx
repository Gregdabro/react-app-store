import styles from './CategoryBtn.module.scss'
const CategoryBtn = ({ children, item, onItemSelect, selectedItem }) => {
  return (
    <button
      onClick={() => onItemSelect(item)}
      className={
        selectedItem === item ? `${styles.active}` : `${styles.categoryBtn}`
      }
    >
      {children}
    </button>
  )
}
export default CategoryBtn
