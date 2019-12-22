//   axios拦截器 统一处理请求token

// 先封装一个axios

import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
// 配置公共地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 接口访问-axios拦截器-统一处理请求token
axios.interceptors.request.use(function (config) {
  // config是发送请求的配置信息
  let token = window.localStorage.getItem('user-token') // 获取token
  config.headers['Authorization'] = `Bearer ${token}` // 统一注入token到headers属性

  return config
})

// 响应拦截器 在进入then之前要判断
axios.interceptors.response.use(function (response) {
  // 响应成功时执行该函数
  return response.data ? response.data : {}
},
// 响应失败时执行该函数
function (error) {
  let status = error.response.status // 获取失败的状态码
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = 'refresh_token未携带或已过期'
      break
    case 401:
      message = 'token过期或未出'
      window.localStorage.clear() // 删除过期的token
      router.push('/login')
      break
    case 507:
      message = '服务器数据库异常'
      break
    default:
      break
  }
  Message({ type: 'warning', message }) // 提示信息
})

export default axios
