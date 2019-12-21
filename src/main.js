
// ####################  main.js这里只负责引用和初始化-------------------------------------------------------------

import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './promission' // 引用权限模块儿

import ElementUI from 'element-ui' // 引入UI

import 'element-ui/lib/theme-chalk/index.css' // 引入样式

import './styles/index.less'

import Component from './components/index.js'

import axios from './utils/request'

Vue.config.productionTip = false

Vue.use(Component) // 全局注册组件

Vue.use(ElementUI) // 全局注册elementUI

Vue.prototype.$axios = axios

new Vue({
  router, // 挂载路由
  render: h => h(App)
}).$mount('#app')
