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
    path: '/home/comment', // 完整的写法
    component: () => import('../views/comment') // 按需加载
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
