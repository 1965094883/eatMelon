import Vue from 'vue'
import VueRouter from 'vue-router'
import app from '../App.vue'
import home from '@/views/home/index'
import login from '../views/login/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'app',
    component: home
  },
  {
    path: '/home',
    name: 'Home',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]
//避免路由重复跳转报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
