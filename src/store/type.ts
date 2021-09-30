import { ILoginState } from './module/login/type'
import { IMainState } from './module/main/type'

export interface IRootSate {
  name: string
  age: number
  searchData?: any
}

export interface IRootWithModule {
  login: ILoginState
  main: IMainState
}

export type IStoreType = IRootSate & IRootWithModule
