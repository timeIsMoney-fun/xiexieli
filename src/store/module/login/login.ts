import { Module } from 'vuex'
import { ILoginState } from './type'
import { IRootSate } from '../../type'
import { userLoginRequest } from '@/service/login/index'
import { IUser, IUserInfo } from '@/service/login/type'
import localCache from '@/utils/cache'
import { catchError } from '@/utils/tool'
import { mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'
const menus = [
  {
    icon: 'el-icon-data-board',
    id: '1',
    name: '数据看板',
    type: 1,
    url: '',
    children: [
      {
        id: '1-1',
        name: '大数据展板',
        type: 2,
        url: '/main/dashboard'
      }
    ]
  },
  {
    icon: 'el-icon-s-grid',
    id: '2',
    name: '商品管理',
    type: 1,
    url: '',
    children: [
      {
        // icon: 'el-icon-monitor',
        id: '2-1',
        name: '鞋厂信息',
        type: 2,
        url: '/main/commodityManagement/shoeFactoryInfo'
      },
      {
        id: '2-2',
        name: '鞋码型号',
        type: 2,
        url: '/main/commodityManagement/shoeSize'
      },
      {
        // icon: 'el-icon-monitor',
        id: '2-3',
        name: '进货单',
        type: 2,
        url: '/main/commodityManagement/purchaseList'
      },
      {
        // icon: 'el-icon-monitor',
        id: '2-4',
        name: '结账单',
        type: 2,
        url: '/main/commodityManagement/statement'
      }
    ]
  },
  {
    icon: 'el-icon-s-management',
    id: '3',
    name: '经营管理',
    type: 1,
    url: '',
    children: [
      {
        id: '3-1',
        name: '员工信息',
        type: 2,
        url: ''
      },
      {
        id: '3-2',
        name: '员工出晴',
        type: 2,
        url: ''
      },
      {
        id: '3-3',
        name: '工资核算',
        type: 2,
        url: ''
      }
    ]
  },
  {
    icon: 'el-icon-setting',
    id: '4',
    name: '系统管理',
    type: 1,
    url: '',
    children: [
      {
        id: '4-1',
        name: '账号管理',
        type: 1,
        url: '',
        children: [
          {
            id: '4-1-1',
            name: '账号信息',
            type: 2,
            url: ''
          },
          {
            id: '4-1-2',
            name: '角色信息',
            type: 2,
            url: ''
          },
          {
            id: '4-1-3',
            name: '权限信息',
            type: 2,
            url: ''
          }
        ]
      },
      {
        id: '4-2',
        name: '日志管理',
        type: 1,
        url: '',
        children: [
          {
            id: '4-2-1',
            name: '操作日志',
            type: 2,
            url: ''
          }
        ]
      }
    ]
  }
]

const loginModule: Module<ILoginState, IRootSate> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    chnageToken(state, token: string) {
      state.token = token
      localCache.setCache('token', token)
    },
    saveUserInfo(state, userInfo: IUserInfo) {
      state.userInfo = userInfo
      localCache.setCache('userInfo', userInfo)
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      localCache.setCache('userMenus', userMenus)

      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus)

      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IUser) {
      const [res, err] = await catchError(() => userLoginRequest(payload))
      console.log(
        '🚀 ~ file: login.ts ~ line 77 ~ accountLoginAction ~ res',
        res
      )

      if (err) {
        console.log(err, 'err')
        return
      }
      const { token, user } = res.data
      commit('chnageToken', token)
      commit('saveUserInfo', user)

      // 下一步请求用户菜单, 接口待做
      commit('changeUserMenus', menus)
      // 跳转到首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('chnageToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('saveUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', menus)
      }
    }
  }
}

export default loginModule
