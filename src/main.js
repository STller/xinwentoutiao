import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 全局样式的设置 比如margin padding
import './styles/index.less'
Vue.config.productionTip = false
Vue.use(ElementUI) // vue.use 到底干了什么
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
