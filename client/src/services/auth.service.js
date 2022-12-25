import axios from 'axios'
import localStorageService from './localStorage.service'

const httpAuth = axios.create({
  baseURL: process.env.REACT_APP_API_URL + 'api/auth/'
})

httpAuth.interceptors.response.use(
  (res) => {
    return res
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 500 &&
      error.response.status < 503

    if (!expectedErrors) {
      alert('Something was wrong. Try it later')
    }
    return Promise.reject(error)
  }
)

const authService = {
  signup: async ({ name, email, password, age, phone, address }) => {
    const { data } = await httpAuth.post('signup', {
      name,
      email,
      password,
      age,
      phone,
      address
    })
    localStorageService.setTokens({ ...data })
    return data
  },
  login: async ({ email, password }) => {
    const { data } = await httpAuth.post('login', {
      email,
      password
    })
    localStorageService.setTokens({ ...data })
    return data
  },
  logout: async () => {
    localStorage.removeItem('user')
  },
  refresh: async () => {
    const { data } = await httpAuth.post('token', {
      grant_type: 'refresh_token',
      refresh_token: localStorageService.getRefreshToken()
    })
    return data
  }
}

export default authService
