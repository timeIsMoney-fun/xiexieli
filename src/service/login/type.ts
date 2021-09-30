export interface IUser {
  name: string
  password: string
}

export interface IUserInfo {
  account: string
  avatar: string
  password: string
  username: string
}
export interface ILoginResult {
  token: string
  user: IUserInfo
}
