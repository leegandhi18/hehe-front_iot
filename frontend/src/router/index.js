import Vue from 'vue'
import VueRouter from 'vue-router'
import jwtDecode from 'jwt-decode'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views'),
    redirect: '/auth/login',
    children: [
      {
        path: '/',
        component: () => import('../views/auth/login'),
        meta: { header: false }
      },
      {
        path: '/dashboard',
        component: () => import('../views/dashBoard')
      },
      {
        path: '/workstatus',
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
      },
      {
        path: '/user',
        component: () => import('../views/user')
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('../views/'),
    children: [
      {
        path: '/auth/login',
        component: () => import('../views/auth/login'),
        meta: { header: false, noLogin: true }
      },
      {
        path: '/auth/logout',
        component: () => import('../views/auth/logout'),
        meta: { header: false, noLogin: true }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  // console.log('router.beforeEach', to, from)

  const noLogin = to.meta.noLogin // 이동할 페이지에서 로그인 허용여부 확인

  if (noLogin === true) {
    // 로그인이 필요없는 페이지는 그냥 이동
    next()
  } else {
    // 로그인이 필요한 페이지는 토큰 체크 후 통과 여부 결정

    // 1. localStorage에서 토큰 추출
    const token = window.localStorage.getItem('token')

    // TODO: 리다이렉트 페이지 처리(이동하려던 페이지로 이동시킬 수 있다.)

    try {
      const decodedToken = jwtDecode(token) // 토큰디코딩
      const today = new Date() // 오늘날짜
      const expDate = new Date(decodedToken.exp * 1000) // 토큰에서 만료일추출

      if (expDate && expDate >= today) {
        // 토큰이 유효한 경우

        // 1. tokenUser정보가 없어진 경우 다시 갱신한다.
        const tokenUser = store.getters['TokenUser']
        if (!tokenUser || !tokenUser.id > 0) {
          store.dispatch('authTokenUser', token)
        }

        // 처리를 다 했으면 가던길 가자
        next()
      } else {
        // 토큰이 만료된 경우
        next('/auth/login') // 로그인 페이지로 이동(여기에서 토큰을 삭제해준다.)
      }
    } catch (err) {
      // 토큰 추출이 실패한 경우에 대한 처리
      next('/auth/login') // 로그인 페이지로 이동
    }
  }
})

export default router
