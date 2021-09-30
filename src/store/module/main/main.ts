import { Module } from 'vuex'
import { IMainState } from './type'
import { IRootSate } from '../../type'
import { catchError } from '@/utils/tool'
import { getPageListData } from '@/service/main'
const urlMap: any = {
  shoeFactoryInfo: '/factory/info/page'
}
const mainModule: Module<IMainState, IRootSate> = {
  namespaced: true,
  state() {
    return {
      shoeFactoryInfoList: [],
      shoeFactoryInfoCount: 0
    }
  },
  getters: {
    getPageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    getPageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeShoeFactoryInfoList(state, payload: any) {
      state.shoeFactoryInfoList = payload
    },
    changeShoeFactoryInfoCount(state, payload: any) {
      state.shoeFactoryInfoCount = payload
    }
  },
  actions: {
    async getPageTableListAction({ commit }, payload) {
      // 获取url
      const url = urlMap[payload.pageName]
      const [res, err] = await catchError(() =>
        getPageListData(url, payload.queryInfo)
      )
      if (err) return
      const changePageName =
        payload.pageName.slice(0, 1).toUpperCase() + payload.pageName.slice(1)
      const { dataList, total } = res.data
      commit(`change${changePageName}List`, dataList)
      commit(`change${changePageName}Count`, total)
      console.log(res, 'res')
    }
  }
}

export default mainModule
