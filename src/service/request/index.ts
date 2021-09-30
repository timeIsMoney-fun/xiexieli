import axios from 'axios'
import { app } from '../../main'
import type { AxiosInstance } from 'axios'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/packages/components/loading/src/loading.type'
import { RequestInterceptors, HqRequest } from './type'
import { IResponseType } from '../type'

// const responseStatus = {
//   200: 'OK',
//   500: '系统内部异常',
//   4000: '参数错误',
//   4001: '参数为空',
//   4002: '用户不存在',
//   4003: '用户名或密码错误',
//   4004: '验证码错误',
//   4005: '文件过大',
//   5000: '无权操作',
//   5001: '操作失败',
//   5002: '当前帐号未登录或登录已失效',
//   6000: '数据不存在',
//   6001: '数据已存在'
// }
class HttpRequest {
  instance: AxiosInstance
  interceptors?: RequestInterceptors
  loading?: ILoadingInstance
  showLoading: boolean

  constructor(config: HqRequest) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? true
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptor
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }

        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 移除loading
        this.loading?.close()
        const data = res.data
        if (data.code === '200') {
          return data
        } else {
          const message: any = app.config.globalProperties.$message
          console.log(
            app.config.globalProperties,
            'app.config.globalProperties'
          )
          message({
            type: 'error',
            showClose: true,
            message: data.desc
          })
        }
        return data
      },
      (err) => {
        this.loading?.close()
        return err
      }
    )
  }

  request<T = any>(config: HqRequest<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          this.showLoading = true
          const result: IResponseType = res as any
          if (result.code === '200') {
            resolve(res)
          } else {
            reject(res)
          }
          console.log(
            '🚀 ~ file: index.ts ~ line 104 ~ HttpRequest ~ .then ~ res',
            res
          )
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T = any>(config: HqRequest<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: HqRequest<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
}

export default HttpRequest
