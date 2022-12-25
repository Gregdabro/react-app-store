import httpService from './http.services'

const categoryEndpoint = 'category/'

const categoryService = {
  get: async () => {
    const req = await httpService.get(categoryEndpoint)
    return req.data
  }
}
export default categoryService
