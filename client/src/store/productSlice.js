import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import productService from '../services/product.service'
import { setMessage } from './messageSlice'
import { toast } from 'react-toastify'
export const getProducts = createAsyncThunk(
  'products/get',
  async (_, thunkAPI) => {
    try {
      const response = await productService.get()
      return response
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (payload, thunkAPI) => {
    try {
      const response = await productService.create(payload)
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

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async (payload, thunkAPI) => {
    try {
      const response = await productService.update(payload)
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

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (product) => product._id !== action.payload
      )
    },
    productRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
      toast.error(`Error: ${action.payload} `, {
        position: 'bottom-left'
      })
    }
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false
      state.entities = action.payload
    },
    [getProducts.rejected]: (state) => {
      state.isLoading = false
    },
    [createProduct.pending]: (state) => {
      state.isLoading = true
    },
    [createProduct.fulfilled]: (state, action) => {
      state.isLoading = false
      state.entities.push(action.payload)
    },
    [createProduct.rejected]: (state) => {
      state.isLoading = false
    }
  }
})
const { reducer: productReducer, actions } = productSlice

const { productRemoved, productRequestFiled } = actions

const removeProductRequested = createAction('products/removeProductRequested')

export const removeProduct = (payload) => async (dispatch) => {
  dispatch(removeProductRequested())
  try {
    const { content } = await productService.delete(payload)
    if (!content) {
      dispatch(productRemoved(payload))
    }
  } catch (error) {
    dispatch(productRequestFiled(error.message))
  }
}

export const isLoadingProductSelector = () => (state) =>
  state.products.isLoading
export const productListSelector = () => (state) => state.products.entities
export const productSelector = (productId) => (state) =>
  state.products.entities.find((product) => product._id === productId)

export const getProductsByIds = (productsIds) => (state) => {
  if (state.products.entities) {
    const productArray = []
    for (const prodId of productsIds) {
      for (const product of state.products.entities) {
        if (product._id === prodId) {
          productArray.push(product)
          break
        }
      }
    }
    return productArray
  }
  return []
}

export default productReducer
