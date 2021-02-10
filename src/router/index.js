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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
