const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USER_KEY = 'user'
const CART_ITEMS = 'cart-items'
const ITEMS_QUANTITY = 'items-quantity'
const CART_TOTAL = 'cart-total'

export function setTokens({
  refreshToken,
  accessToken,
  user,
  expiresIn = 3600
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  localStorage.setItem(TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, expiresDate)
}
export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY)
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY)
}
export function removeAuthData() {
  localStorage.removeItem(USER_KEY)
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(EXPIRES_KEY)
}

export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY)
}
export function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY))
}

export function getCartItems() {
  return JSON.parse(localStorage.getItem(CART_ITEMS))
}
export function setCartItems(entities) {
  localStorage.setItem(CART_ITEMS, JSON.stringify(entities))
}
export function removeCartItems() {
  localStorage.removeItem(CART_ITEMS)
}
export function getItemsQuantity() {
  return Number(localStorage.getItem(ITEMS_QUANTITY))
}
export function setItemsQuantity(quantity) {
  localStorage.setItem(ITEMS_QUANTITY, quantity)
}
export function removeItemsQuantity() {
  localStorage.removeItem(ITEMS_QUANTITY)
}

export function getCartTotal() {
  return Number(localStorage.getItem(CART_TOTAL))
}
export function setCartTotal(total) {
  localStorage.setItem(CART_TOTAL, total)
}
export function removeCartTotal() {
  localStorage.removeItem(CART_TOTAL)
}
export function removeCart() {
  localStorage.removeItem(ITEMS_QUANTITY)
  localStorage.removeItem(CART_TOTAL)
  localStorage.removeItem(CART_ITEMS)
}
const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUser,
  removeAuthData,
  getCartItems,
  getCartTotal,
  getItemsQuantity,
  setCartItems,
  setCartTotal,
  setItemsQuantity,
  removeCart,
  removeCartTotal,
  removeCartItems,
  removeItemsQuantity
}
export default localStorageService
