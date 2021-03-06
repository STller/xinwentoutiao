import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import ElementUI from 'element-ui'
import Component from '../src/components/index' // 引入普通组件
import 'element-ui/lib/theme-chalk/index.css'
// 全局样式的设置 比如margin padding
import './styles/index.less'
import axios from './utils/axios.config'
Vue.prototype.$axios = axios // 将axios给所有vue组件实例
Vue.config.productionTip = false
Vue.use(ElementUI) // vue.use 到底干了什么
Vue.use(Component)
Vue.use(axios)

new Vue({
  router, // 引入路由表 切换路由即切换页面组件 在App.vue的router-view中渲染出来
  render: h => h(App) // 渲染App.vue 所有的页面组件在App.vue中的router-view中渲染
}).$mount('#app')
