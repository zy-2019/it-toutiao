import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
// import mainBody from '../views/home/home'
import breadCrumb from './common/bread-crumb'

import { quillEditor } from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import coverImage from './publish/coverImage'

export default {
  install (Vue) {
    Vue.component('layoutAside', layoutAside) // 注册一个全局组件
    Vue.component('layoutHeader', layoutHeader)
    // Vue.component('mainBody', mainBody)
    Vue.component('bread-crumb', breadCrumb) // 注册一个全局的面包屑组件

    Vue.component('quill-editor', quillEditor) // 注册一个全局的富文本编辑器

    Vue.component('cover-image', coverImage) // 注册一个封面的组件
  }
}
