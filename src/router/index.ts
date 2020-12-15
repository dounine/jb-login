import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
]

declare const window: any;
const router = createRouter({
  history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/login' : '/'),
  routes
})

export default router
