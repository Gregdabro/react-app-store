import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import colorService from '../services/colorService'
export const getColors = createAsyncThunk('colors/get', async (_, thunkAPI) => {
  try {
    const response = await colorService.get()
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

const colorSlice = createSlice({
  name: 'colors',
  initialState,
  extraReducers: {
    [getColors.fulfilled]: (state, action) => {
      state.isLoading = false
      state.entities = action.payload
      state.error = ''
    },
    [getColors.pending]: (state) => {
      state.isLoading = true
    },
    [getColors.rejected]: (state) => {
      state.isLoading = false
    }
  }
})
const { reducer: colorReducer } = colorSlice

// Selectors
export const isLoadingColorSelector = () => (state) => state.colors.isLoading
export const colorListSelector = () => (state) => state.colors.entities

export const getColorsByIds = (colorsIds) => (state) => {
  if (state.colors.entities) {
    const colorsArray = []
    for (const colorId of colorsIds) {
      for (const color of state.colors.entities) {
        if (color._id === colorId) {
          colorsArray.push(color)
          break
        }
      }
    }
    return colorsArray
  }
  return []
}
export const colorSelector = (colorId) => (state) =>
  state.colors.entities.find((color) => color._id === colorId)

export default colorReducer
