import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootSate, IStoreType } from './type'
import login from './module/login/login'
import main from './module/main/main'
const store = createStore<IRootSate>({
  state() {
    return {
      name: 'huqing',
      age: 18,
      searchData: {}
    }
  },
  getters: {
    getSearchData: (state) => state.searchData
  },
  mutations: {
    changeSearchData(state, payload: any) {
      state.searchData = payload
    }
  },
  actions: {},
  modules: {
    login,
    main
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
