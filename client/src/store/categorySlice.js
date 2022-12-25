import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import categoryService from '../services/categoryService'
export const getCategories = createAsyncThunk(
  'categories/get',
  async (_, thunkAPI) => {
    try {
      const response = await categoryService.get()
      return response
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)
const initialState = {
  entities: [],
  isLoading: true,
  error: null
}

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: {
    [getCategories.fulfilled]: (state, action) => {
      state.isLoading = false
      state.entities = action.payload
      state.error = ''
    },
    [getCategories.pending]: (state) => {
      state.isLoading = true
    },
    [getCategories.rejected]: (state) => {
      state.isLoading = false
    }
  }
})
const { reducer: categoryReducer } = categorySlice

export const categoryLoadingSelector = () => (state) => state.colors.isLoading
export const categoryListSelector = () => (state) => state.categories.entities

export const categorySelector = (categoryId) => (state) =>
  state.categories.entities.find((category) => category._id === categoryId)

export default categoryReducer
