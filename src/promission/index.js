// 专门去处理路由拦截器 ======>>>>>>>>>>>>>导航守卫(进度条小插件从这里写)

import router from '../router'

import progress from 'nprogress'

import 'nprogress/nprogress.css'

// 全局前置守卫  当路由发生那个变化时就会执行里边的回调函数

router.beforeEach(function (to, from, next) {
  progress.start() // 开启进度条

  // 权限拦截  要是有token的就放过  没有的不让过

  // 先确定要去检查的范围
  if (to.path.startsWith('/home')) {
    // 判断token
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

// 全局后置守卫  关闭进度条

router.afterEach(function () {
  setTimeout(function () {
    progress.done() // 关闭进度条
  }, 500)
})
