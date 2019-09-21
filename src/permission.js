// 权限
// 该组件在router的基础上加了前置守卫
import router from './router'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  // 判断拦截范围
  if (to.path.startsWith('/home')) {
    // 进入拦截范围
    // 判断有无token
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login') // 没有token 就跳转到登录页
    }
  } else {
    next()
  }
})
export default router
