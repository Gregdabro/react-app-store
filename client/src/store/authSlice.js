import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import { setMessage } from './messageSlice'
import { getUser } from '../services/localStorage.service'

const user = getUser()
export const signup = createAsyncThunk(
  'auth/signup',
  async ({ name, email, password, age, phone, address }, thunkAPI) => {
    try {
      const response = await authService.signup({
        name,
        email,
        password,
        age,
        phone,
        address
      })
      return response.user
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
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await authService.login({ email, password })
      return response.user
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
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})
const initialState = user
  ? { isLoggedIn: true, user, isAdmin: user.role === 'ADMIN' }
  : { isLoggedIn: false, user: null }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [signup.fulfilled]: (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload
    },
    [signup.rejected]: (state) => {
      state.isLoggedIn = false
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload
    },
    [login.rejected]: (state) => {
      state.isLoggedIn = false
      state.user = null
    },
    [logout.fulfilled]: (state) => {
      state.isLoggedIn = false
      state.user = null
    }
  }
})
const { reducer: authReducer } = authSlice

export const isLoggedInSelector = () => (state) => state.auth.isLoggedIn
export const getCurrentUser = () => (state) => state.auth.user
export const isAdminSelector = () => (state) => state.auth.isAdmin
export default authReducer
