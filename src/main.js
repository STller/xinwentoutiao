import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 全局样式的设置 比如margin padding
import './styles/index.less'
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(ElementUI) // vue.use 到底干了什么
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios // 将axios给所有vue组件实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
