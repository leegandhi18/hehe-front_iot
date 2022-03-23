import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views'),
    children: [
      {
        path: '/',
        component: () => import('../views/Home.vue'),
        meta: { header: false }
      },
      {
        path: '/dashBoard',
        component: () => import('../views/dashBoard')
      },
      {
        path: '/workStatus',
        component: () => import('../views/workStatus')
      },
      {
        path: '/history',
        component: () => import('../views/history')
      },
      {
        path: '/machine',
        component: () => import('../views/machine')
      },
      {
        path: '/item',
        component: () => import('../views/item')
      },
      {
        path: '/admin',
        component: () => import('../views/admin')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
