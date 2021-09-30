import { IResponseType } from '../type'
import HttpRequest from '../index'
import { IUser, ILoginResult } from './type'

enum LoginAPI {
  UserLogin = '/system/login'
}

export function userLoginRequest(account: IUser) {
  return HttpRequest.post<IResponseType<ILoginResult>>({
    url: LoginAPI.UserLogin,
    data: account
  })
}
