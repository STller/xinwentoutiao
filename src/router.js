import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/index.vue'
import Login from './views/login/index.vue'
import Main from './views/Home/main.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  },
  // 一级路由
  {
    path: '/home',
    component: Home,
    // 二级路由
    children: [{
      path: '', // 什么都不写 就是默认二级路由组件
      component: Main
    },
    {
      path: '/home/comment',
      component: () => import('./views/comment/index.vue') // 评论页面按需加载
    },
    {
      path: '/home/material',
      component: () => import('./views/material/index.vue')
    },
    {
      path: '/home/articles',
      component: () => import('./views/articles/index.vue')
    },
    {
      path: '/home/publish/:articleId',
      component: () => import('./views/publish/index.vue')
    },
    {
      // 由于/home/publish不能匹配带参数的 所以再写一个
      path: '/home/publish',
      component: () => import('./views/publish/index.vue')
    },
    {
      path: '/home/account',
      component: () => import('./views/account/index.vue')
    },
    {
      // 图文数据
      path: '/home/gradata',
      component: () => import('./views/fans/index.vue')
    }
    ]
  }, {
    path: '/login',
    component: Login
  }
  ]
})
