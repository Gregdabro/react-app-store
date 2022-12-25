import ActionButton from '../UI/ActionButton/ActionButton'
import Table from '../common/table/Table'

const UsersTable = ({ users, onDelete }) => {
  const columns = {
    id: {
      path: '_id',
      name: 'ID'
    },
    name: {
      path: 'name',
      name: 'User Name'
    },
    email: {
      path: 'email',
      name: 'Email'
    },
    age: {
      path: 'age',
      name: 'Age'
    },
    phone: {
      path: 'phone',
      name: 'Phone'
    },
    actions: {
      name: '#',
      component: (user) => (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'nowrap' }}>
          <ActionButton action="REMOVE" onClick={() => onDelete(user._id)} />
        </div>
      )
    }
  }
  return (
    <>
      <Table columns={columns} data={users} />
    </>
  )
}

export default UsersTable
