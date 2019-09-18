import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home/index.vue'
import Login from './views/login/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // 一级路由
    {
      path: '/',
      redirect: '/login'
    }, {
      path: '/login',
      component: Login
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   // 按需加载 留着有用
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
