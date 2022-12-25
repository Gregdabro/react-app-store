import httpService from './http.services'

const usersEndpoint = 'users/'

const usersService = {
  get: async () => {
    const req = await httpService.get(usersEndpoint)
    return req.data
  },
  delete: async (payload) => {
    const req = await httpService.delete(usersEndpoint + payload)
    return req.data
  }
}
export default usersService
