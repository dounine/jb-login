import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Forget from '../views/Forget.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login/:loginType',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register/:registerType',
    name: 'Register',
    component: Register
  },
  {
    path: '/forget/:forgetType',
    name: 'Forget',
    component: Forget
  },
  {
    path: '',
    redirect: '/login/account'
  },
  {
    path: '/login',
    redirect: '/login/account'
  },
  {
    path: '/register',
    redirect: '/register/phone'
  },
  {
    path: '/forget',
    redirect: '/forget/phone'
  }
]

declare const window: any;
const router = createRouter({
  history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/' : '/'),
  routes
})

export default router
