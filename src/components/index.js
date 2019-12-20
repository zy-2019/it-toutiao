import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
export default {
  install (Vue) {
    Vue.component('layoutAside', layoutAside) // 注册一个全局组件
    Vue.component('layoutHeader', layoutHeader)
  }
}
