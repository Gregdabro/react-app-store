import httpService from './http.services'

const orderEndpoint = 'orders/'

const ordersService = {
  create: async (payload) => {
    const { data } = await httpService.post(orderEndpoint, payload)
    return data
  },
  get: async () => {
    const req = await httpService.get(orderEndpoint)
    return req.data
  },
  delete: async (payload) => {
    const req = await httpService.delete(orderEndpoint + payload)
    return req.data
  }
}
export default ordersService
