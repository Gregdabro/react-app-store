import styles from './CategoryBtnList.module.scss'
import CategoryBtn from './CategoryBtn'
import CategoryBtnAll from './CategoryBtnAll'
const CategoryBtnList = ({
  categories,
  onItemSelect,
  selectedItem,
  onClearFilter
}) => {
  return (
    <div className={styles.categoryList}>
      <CategoryBtnAll onClearFilter={onClearFilter}>
        all
      </CategoryBtnAll>
      {categories.map((item) => (
        <CategoryBtn
          key={item._id}
          onItemSelect={onItemSelect}
          selectedItem={selectedItem}
          item={item}
        >
          {item.name}
        </CategoryBtn>
      ))}
    </div>
  )
}
export default CategoryBtnList
