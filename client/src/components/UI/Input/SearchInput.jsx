import classes from './SearchInput.module.scss'

const SearchInput = (props) => {
  return <input className={classes.myInput} {...props} />
}

export default SearchInput
