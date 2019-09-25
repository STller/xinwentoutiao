// 实现普通组件的整体统一注册
import layoutAside from './Home/layout-aside.vue'
import layoutHeader from './Home/layout-header.vue'
import breadCrumb from './common/bread-crumb.vue'
// 全局注册quill
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import coverImg from './publish/cover-img.vue'
import selectImg from './publish/select-img'
export default {
  install: function (Vue) {
    // 调用install方法 传入Vue对象
    // 在实例化之前注册组件
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-img', coverImg)
    Vue.component('select-img', selectImg)
  }
}
