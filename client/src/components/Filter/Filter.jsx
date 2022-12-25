import styles from './Filter.module.scss'
import MySelect from '../UI/SortSelect/SortSelect'
import CategoryBtnList from '../UI/CategoryBtnList/CategoryBtnList'
import SearchInput from '../UI/Input/SearchInput'

const Filter = ({
  filter,
  setFilter,
  selectedItem,
  onItemSelect,
  categories,
  onClearFilter,
  options
}) => {
  return (
    <div className={styles.filterWrapper}>
      {categories && (
        <div className={styles.listBtn}>
          <CategoryBtnList
            categories={categories}
            onItemSelect={onItemSelect}
            selectedItem={selectedItem}
            onClearFilter={onClearFilter}
          />
        </div>
      )}
      <div className={styles.search}>
        <SearchInput
          value={filter.query}
          onChange={(e) => setFilter({ ...filter, query: e.target.value })}
          placeholder="Поиск..."
        />
      </div>
      <div className={styles.select}>
        <MySelect
          value={filter.sort}
          onChange={(selectedSort) =>
            setFilter({ ...filter, sort: selectedSort })
          }
          defaultValue="Сортировка"
          options={options}
        />
      </div>
    </div>
  )
}

export default Filter
