import { useSelector } from 'react-redux'
import {
  getColorsByIds,
  isLoadingColorSelector
} from '../../../store/colorSlice'
import Color from './Color'

const ColorList = ({ colors }) => {
  console.log('colorsIds', colors)
  const isLoading = useSelector(isLoadingColorSelector())
  const colorList = useSelector(getColorsByIds(colors))
  return (
    <>
      {!isLoading
        ? colorList.map((item) => <Color key={item._id} {...item} />)
        : 'Loading...'}
    </>
  )
}

export default ColorList
