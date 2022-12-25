import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import usersService from '../services/users.service'
export const getUsers = createAsyncThunk('users/get', async (_, thunkAPI) => {
  try {
    const response = await usersService.get()
    return response
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})

const initialState = {
  entities: [],
  isLoading: false,
  error: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (product) => product._id !== action.payload
      )
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
      toast.error(`Error: ${action.payload} `, {
        position: 'bottom-left'
      })
    }
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.isLoading = true
    },
    [getUsers.fulfilled]: (state, action) => {
      state.isLoading = false
      state.entities = action.payload
    },
    [getUsers.rejected]: (state) => {
      state.isLoading = false
    }
  }
})
const { reducer: usersReducer, actions } = usersSlice

const { usersRemoved, usersRequestFiled } = actions

const removeUsersRequested = createAction('users/removeUsersRequested')

export const removeUser = (payload) => async (dispatch) => {
  dispatch(removeUsersRequested())
  try {
    const { content } = await usersService.delete(payload)
    if (!content) {
      dispatch(usersRemoved(payload))
    }
  } catch (error) {
    dispatch(usersRequestFiled(error.message))
  }
}

export const isUsersLoadingSelector = () => (state) => state.users.isLoading
export const usersListSelector = () => (state) => state.users.entities
export const userSelector = (userId) => (state) =>
  state.users.entities.find((u) => u._id === userId)

export const getUsersByIds = (userIds) => (state) => {
  if (state.users.entities) {
    const usersArray = []
    for (const userId of userIds) {
      for (const user of state.users.entities) {
        if (user._id === userId) {
          usersArray.push(user)
          break
        }
      }
    }
    return usersArray
  }
  return []
}

export default usersReducer
