// 实现普通组件的整体统一注册
import layoutAside from './Home/layout-aside.vue'
import layoutHeader from './Home/layout-header.vue'
export default {
  install: function (Vue) {
    // 调用install方法 传入Vue对象
    // 在实例化之前注册组件
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
  }
}
