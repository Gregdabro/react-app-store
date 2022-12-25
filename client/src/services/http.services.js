import axios from 'axios'
import localStorageService from './localStorage.service'
import authService from './auth.service'

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL + 'api/'
})

http.interceptors.response.use(
  (res) => {
    return res
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500

    if (!expectedErrors) {
      alert('Something was wrong. Try it later')
    }
    return Promise.reject(error)
  }
)

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate()
    const refreshToken = localStorageService.getRefreshToken()
    const isExpired = refreshToken && expiresDate < Date.now()

    if (isExpired) {
      const data = await authService.refresh()
      localStorageService.setTokens(data)
    }
    const accessToken = localStorageService.getAccessToken()
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`
      }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch
}
export default httpService