import axios from 'axios'
import store from '@/store'
import { getToken, setRefreshToken, setToken } from '@/utils/auth'
import { tokenRefresh } from '@/api/member'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log(`success: ${response.config.url} :`, response.data)
    if (res.code === 13) {
      // 令牌刷新成功
    }

    // if the custom code is not 20000, it is judged as an error.
    if (res.code < 1) {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {

      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    const res = error.response.data
    console.log(`error: ${error.response.config.url} :`, error.response.data)

    if (res.code === 10) {
      // 登录失败
      return Promise.reject(res)
    }

    if (res.code === 11) {
      // 令牌过期
      tokenRefresh().then(res => {
        const { access_token, refresh_token } = res.data
        setToken(access_token)
        setRefreshToken(refresh_token)
        error.config.headers.Authorization = `Bearer ${access_token}`
        return axios(error.config)
      })
    }

    if (res.code === 12) {
      // 令牌刷新失败
      store.dispatch('member/resetToken').then(() => {
        // ?
        router.replace(`/login`)
      })
      return Promise.reject(res)
    }
    return Promise.reject(res)
  }
)

export default service
