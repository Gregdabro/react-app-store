import authReducer from './authSlice'
import productsReducer from './productSlice'
import categoryReducer from './categorySlice'
import colorReducer from './colorSlice'
import messageReducer from './messageSlice'
import cartReducer from './cartSlice'
import usersReducer from './userSlice'
import orderReducer from './orderSlice'

const { combineReducers, configureStore } = require('@reduxjs/toolkit')

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  categories: categoryReducer,
  colors: colorReducer,
  cart: cartReducer,
  message: messageReducer,
  users: usersReducer,
  orders: orderReducer
})

export function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}
