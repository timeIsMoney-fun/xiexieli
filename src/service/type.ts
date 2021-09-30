export interface IResponseType<T = any> {
  code: string
  data: T
  desc: string
}
