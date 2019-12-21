//   axios拦截器 统一处理请求token

// 先封装一个axios

import axios from 'axios'

// 配置公共地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

axios.interceptors.request.use(function (config) {
  // config是发送请求的配置信息

  let token = window.localStorage.getItem('user-token') // 获取token
  config.headers['Authorization'] = `Bearer ${token}` // 统一注入token到headers属性

  return config
})
export default axios
