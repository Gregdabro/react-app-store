import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { setMessage } from './messageSlice'
import { toast } from 'react-toastify'
import localStorageService from '../services/localStorage.service'
import ordersService from '../services/orders.service'
export const getOrders = createAsyncThunk(
  'orders/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await ordersService.get()
      return response
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ payload }, thunkAPI) => {
    try {
      const { _id, name } = localStorageService.getUser()
      const response = await ordersService.create({
        ...payload,
        userId: _id,
        userName: name
      })
      return response
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString()
      thunkAPI.dispatch(setMessage(message))
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const editOrder = createAsyncThunk(
  'orders/editOrders',
  async (payload, thunkAPI) => {
    try {
      const response = await ordersService.update(payload)
      return response.data
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString()
      thunkAPI.dispatch(setMessage(message))
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

const initialState = {
  entities: [],
  isLoading: false,
  error: null
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    orderRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (order) => order._id !== action.payload
      )
    },
    orderRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
      toast.error(`Error: ${action.payload} `, {
        position: 'bottom-left'
      })
    }
  },
  extraReducers: {
    [getOrders.pending]: (state) => {
      state.isLoading = true
    },
    [getOrders.fulfilled]: (state, action) => {
      state.isLoading = false
      state.entities = action.payload
    },
    [getOrders.rejected]: (state) => {
      state.isLoading = false
    },
    [createOrder.pending]: (state) => {
      state.isLoading = true
    },
    [createOrder.fulfilled]: (state, action) => {
      state.isLoading = false
      state.entities.push(action.payload)
    },
    [createOrder.rejected]: (state) => {
      state.isLoading = false
    }
  }
})
const { reducer: orderReducer, actions } = orderSlice

const { orderRemoved, orderRequestFiled } = actions

const removeOrderRequested = createAction('orders/removeOrderRequested')

export const removeOrder = (payload) => async (dispatch) => {
  dispatch(removeOrderRequested())
  try {
    const { content } = await ordersService.delete(payload)
    if (!content) {
      dispatch(orderRemoved(payload))
    }
  } catch (error) {
    dispatch(orderRequestFiled(error.message))
  }
}

export const orderLoadingSelector = () => (state) => state.orders.isLoading
export const orderListSelector = () => (state) => state.orders.entities
export const orderSelector = (orderId) => (state) =>
  state.orders.entities.find((order) => order._id === orderId)

export default orderReducer
