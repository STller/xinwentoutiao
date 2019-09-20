import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/index.vue'
import Login from './views/login/index.vue'
import Main from './views/Home/main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    // 一级路由
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          component: Main
        }]
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
