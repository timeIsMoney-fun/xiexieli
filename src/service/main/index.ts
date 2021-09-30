import { IResponseType } from '../type'
import HttpRequest from '../index'

export function getPageListData(url: string, queryInfo: any) {
  return HttpRequest.post<IResponseType>({
    url,
    data: queryInfo
  })
}
