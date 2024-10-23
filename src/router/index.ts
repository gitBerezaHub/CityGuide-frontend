import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue')
  },
  {
    path: '/request',
    name: 'request',
    component: () => import('@/pages/RequestPage.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/pages/MapPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
