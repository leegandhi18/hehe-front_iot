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
        component: () => import('../views/Home.vue')
      },
      {
        path: '/sub',
        component: () => import('../views/sub'),
        children: [
          {
            path: '/sub/dashboard',
            component: () => import('../views/sub/dashboard.vue')
          }
        ]
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
