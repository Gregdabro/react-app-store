import httpService from './http.services'

const colorEndpoint = 'color/'

const colorService = {
  get: async () => {
    const req = await httpService.get(colorEndpoint)
    return req.data
  }
}
export default colorService
