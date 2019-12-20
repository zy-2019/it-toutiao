import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import mainBody from '../views/home/home'
export default {
  install (Vue) {
    Vue.component('layoutAside', layoutAside) // 注册一个全局组件
    Vue.component('layoutHeader', layoutHeader)
    Vue.component('mainBody', mainBody)
  }
}
