import { AiOutlineDelete, AiOutlineSetting } from 'react-icons/ai'

const ActionButton = ({ action, ...rest }) => {
  switch (action) {
    case 'REMOVE': {
      return (
        <button {...rest}>
          <AiOutlineDelete />
        </button>
      )
    }
    case 'UPDATE': {
      return (
        <button {...rest}>
          <AiOutlineSetting />
        </button>
      )
    }
    default:
      break
  }
}

export default ActionButton
