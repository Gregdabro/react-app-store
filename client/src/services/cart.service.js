import httpService from './http.services'

const cartItemEndpoint = 'cart-item/'
const cartEndpoint = 'cart/'

const cartService = {
  create: async () => {
    const req = await httpService.post(cartEndpoint)
    return req.data
  },
  get: async () => {
    const req = await httpService.get(cartItemEndpoint)
    return req.data
  }
}
export default cartService
