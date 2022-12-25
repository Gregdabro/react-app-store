import IMAGES from '../../../constants/images'
const Image = ({ path }) => {
  return <>{path ? <img src={IMAGES[path]} /> : 'not found'}</>
}

export default Image
