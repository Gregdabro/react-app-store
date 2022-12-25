import httpService from './http.services'
const productEndpoint = 'products/'

const productService = {
  get: async () => {
    const req = await httpService.get(productEndpoint)
    return req.data
  },
  create: async (payload) => {
    const req = await httpService.post(productEndpoint, payload)
    return req.data
  },
  update: async (payload) => {
    const { productId } = payload
    const req = await httpService.patch(productEndpoint + productId, payload)
    return req.data
  },
  delete: async (payload) => {
    const req = await httpService.delete(productEndpoint + payload)
    return req.data
  }
}
export default productService
