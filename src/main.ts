import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './assets/css/index.less'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { globalRegister } from './global'
export const app = createApp(App)
console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')

app.use(globalRegister)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(store)
setupStore()
app.use(router)
app.mount('#app')
