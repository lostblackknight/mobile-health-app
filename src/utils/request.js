import axios from 'axios'
import QS from 'qs'

function getToken() {
  return 'admin'
}

// 自定义 axios 实例
const instance = axios.create({
  // baseURL 将自动加在 url 前面，除非 url 是一个绝对 URL。
  baseURL: process.env.VUE_APP_BASE_API,
  // 配置响应超时时间
  timeout: 5000,
  // 序列化 params，如果 params 中包含数组，例如 { ids: [1, 2, 3] }，格式化为 ?id=1&id=2&id=3
  paramsSerializer: params => {
    return QS.stringify(params, { arrayFormat: 'repeat' })
  }
})

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 添加请求头
    config.headers.Authorization = `Bearer ${getToken()}`
    return config
  },
  error => {
    // 对请求错误做些什么
    console.error('发送请求失败，错误为：', error)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    // 2xx 范围内的状态码都会触发该函数
    // 对响应数据做点什么
    console.info('获取响应成功，结果为：', response)
    const { data } = response
    return data
  },
  error => {
    // 超出 2xx 范围的状态码都会触发该函数
    // 对响应错误做点什么
    console.error('获取响应失败，错误为：', error)
    return Promise.reject(error)
  }
)

export default instance
