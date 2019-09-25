// 对axios请求进行拦截处理
import axios from 'axios'
import { Message } from 'element-ui'
import router from '../permission' // 为什么不能用this.$router 这里的this不是Vue实例
import jsonBigInit from 'json-bigint'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.defaults.transformResponse = [function (data) {
  // 处理大数字类型
  // 超过最大安全数字会报错 导致数据失真
  // 引入第三方的安全包 换了转化方法
  return data ? jsonBigInit.parse(data) : ''
  // 如果data存在则转化 否则不转化
}]
// 请求拦截
axios.interceptors.request.use(function (config) {
// 对发起的请求做一些业务处理
// config是要发送请求的配置信息
  let token = window.localStorage.getItem('user-token') // 获取token信息
  config.headers['Authorization'] = `Bearer ${token}` // 统一注入token
  return config // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(function (response) {
  // 对响应数据做处理 执行成功时进入
  return response.data ? response : {}
}, function (error) {
  // 执行失败时执行
  // debugger
  let status = error.response.status ? error.response.status : ''// 获取失败的状态码
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未出'
      window.localStorage.clear() // 清空缓存
      router.push('/login') // this.$router.push()
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ message })
  //   希望 在异常处理函数中将所有的错误都处理完毕 不再进入catch  终止错误
  return new Promise(function () {}) // 终止当前的错误
})
export default axios
