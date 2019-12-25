import Vue from 'vue'

import VueRouter from 'vue-router'

import Home from '../views/home'

import Login from '../views/login'

import HomeTwo from '../views/home/home.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
},
{
  path: '/home',
  // name: 'home',
  component: Home,
  children: [{
    path: '',
    component: HomeTwo
  }, {
    path: '/home/comment', //  评论列表完整的写法
    component: () => import('../views/comment') // 按需加载
  }, {
    path: '/home/material', // 素材列表完整的写法
    component: () => import('../views/material') // 按需加载
  }, {
    path: '/home/articles', // 文章列表完整的写法  也可以直接写articles
    component: () => import('../views/articles') // 按需加载
  }, {
    path: '/home/publish', // 文章列表完整的写法  也可以直接写articles
    component: () => import('../views/publish') // 按需加载
  }]

},
{
  path: '/login',
  component: Login
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
}
]

const router = new VueRouter({
  routes
})

export default router
