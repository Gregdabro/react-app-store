import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import {
  getCartItems,
  getItemsQuantity,
  getCartTotal,
  setCartItems,
  setCartTotal,
  setItemsQuantity,
  removeCart
} from '../services/localStorage.service'

const cartItems = getCartItems()
const quantities = getItemsQuantity()
const total = getCartTotal()

const initialState = {
  entities: cartItems || [],
  itemQuantities: quantities || 0,
  total: total || 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      const itemExist = state.entities.find(
        (item) => item._id === action.payload._id
      )
      const itemIndex = state.entities.findIndex(
        (item) => item._id === action.payload._id
      )
      if (itemExist) {
        state.entities[itemIndex].amount += action.payload.amount
        state.total += action.payload.price * action.payload.amount
        toast.info(
          `${state.entities[itemIndex].name} добавлено еще ${action.payload.amount} `,
          {
            position: 'bottom-left'
          }
        )
      } else {
        state.itemQuantities += 1
        state.entities.push(action.payload)
        state.total += action.payload.price * action.payload.amount
        setItemsQuantity(state.itemQuantities)
        toast.success(`${action.payload.name} добавлен в корзину`, {
          position: 'bottom-left'
        })
      }
      setCartItems(state.entities)
      setCartTotal(state.total)
    },
    increase: (state, action) => {
      const itemIndex = state.entities.findIndex(
        (item) => item._id === action.payload
      )
      state.entities[itemIndex].amount += 1
      state.total += state.entities[itemIndex].price
      setCartItems(state.entities)
      setCartTotal(state.total)
    },
    decrease: (state, action) => {
      const itemIndex = state.entities.findIndex(
        (item) => item._id === action.payload
      )
      state.entities[itemIndex].amount -= 1
      state.total -= state.entities[itemIndex].price
      setCartItems(state.entities)
      setCartTotal(state.total)
    },
    removeItem: (state, action) => {
      const findEl = state.entities.find((item) => item._id === action.payload)
      state.total -= findEl.amount * findEl.price
      state.entities = state.entities.filter(
        (item) => item._id !== action.payload
      )
      state.itemQuantities -= 1
      setCartItems(state.entities)
      setItemsQuantity(state.itemQuantities)
      setCartTotal(state.total)
      if (state.entities.length === 0) {
        removeCart()
      }
    },
    clearCart: (state, action) => {
      state.entities = []
      state.itemQuantities = 0
      state.total = 0
      removeCart()
    }
  }
})

export const { reducer: cartReducer, actions } = cartSlice

export const { addProduct, increase, decrease, removeItem, clearCart } = actions

export const cartItemsSelector = () => (state) => state.cart.entities

export const cartItemQuantitiesSelector = () => (state) =>
  state.cart.itemQuantities

export const cartTotalSelector = () => (state) => state.cart.total

export default cartReducer
