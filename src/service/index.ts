import HttpRequest from './request/index'

import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const request = new HttpRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache('token')
      if (token) {
        config.headers['token'] = token
      }
      config.headers['token'] = token
      config.headers['Content-Type'] = 'application/json;charset=utf-8'
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('单个实例请求拦截失败')
      return err
    },
    responseInterceptor: (res) => {
      console.log('单个实例响应')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('单个实例响应失败')
      return err
    }
  }
})

export default request
