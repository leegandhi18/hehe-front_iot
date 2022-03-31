import api from '../apiUtil'
import jwtDecode from 'jwt-decode'

// const testToken =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcmlkIjoiaG9uZyIsIm5hbWUiOiLtmY3quLjrj5kiLCJyb2xlIjoibGVhZGVyIiwiaWF0IjoxNjM5NDY2OTg1LCJleHAiOjE5NTQ4MjY5ODV9.-hTy681tbe62pV9tjArzc5Ig33frnh9j_NjegGiHJNw'

const stateInit = {
  TokenUser: {
    id: null,
    name: null,
    role: null,
    phone: null,
    iat: null,
    exp: null
  }
}

export default {
  state: {
    TokenUser: { ...stateInit.TokenUser }, // token에서 추출한 사용자 정보
    Loading: false,
    Error: null
  },
  getters: {
    TokenUser: state => state.TokenUser,
    TokenLoading: state => state.Loading,
    TokenError: state => state.Error
  },
  mutations: {
    setTokenUser(state, data) {
      state.TokenUser = data
    },
    setLoading(state, data) {
      state.Loading = data
      state.Error = null
    },
    setError(state, data) {
      state.Error = data
      state.Loading = false
      state.TokenUser = { ...stateInit.TokenUser }
    },
    clearError(state) {
      state.Error = null
    },
    setLogout(state) {
      state.Loading = false
      state.Error = null
      state.TokenUser = { ...stateInit.TokenUser }
    }
  },
  actions: {
    authLogin(context, payload) {
      // 로그인 처리

      // 상태값 초기화
      context.commit('clearError')
      context.commit('setLoading', true)

      /* 테스트 데이터 세팅 */
      // setTimeout(() => {
      //   const token = testToken
      //   const decodedToken = jwtDecode(token)

      //   // api를 호출하지 않으므로 직접 localStorage에 token을 저장 한다.
      //   window.localStorage.setItem('token', token)

      //   context.commit('setLoading', false)
      //   context.commit('setTokenUser', decodedToken)
      // }, 2000) // 처리 시간을 2초로 주었다.

      /* RestApi 호출 */
      api
        .post('/serverApi/auths/token', payload)
        .then(response => {
          const token = response.headers.token
          const decodedToken = jwtDecode(token)

          // 정상인 경우 처리
          context.commit('setLoading', false)
          context.commit('setTokenUser', decodedToken)
        })
        .catch(error => {
          // 에러인 경우 처리
          context.commit('setLoading', false)
          context.commit('setError', error)
        })
    },
    async authLogout(context) {
      // 로그아웃 처리

      // 상태값 초기화
      context.commit('clearError')
      context.commit('setLoading', true)

      /* 테스트 데이터 세팅 */
      // setTimeout(() => {
      //   context.commit('setLogout') // 로그아웃 처리
      //   window.localStorage.removeItem('token') // 토큰 삭제
      // }, 1000) // 처리 시간을 1초로 주었다.

      /* RestApi 호출 */
      // api 결과와 관계없이 로컬에서는 로그아웃 처리 함
      try {
        await api.delete('/serverApi/auths/token') // await를 걸지 않으면 토큰삭제 후 전송될 수 있음
        context.commit('setLogout') // 로그아웃 처리
        window.localStorage.removeItem('token') // 토큰 삭제
      } catch (err) {
        context.commit('setLogout') // 로그아웃 처리
        window.localStorage.removeItem('token') // 토큰 삭제
      }
    },
    authTokenUser(context, payload) {
      // 토큰사용자 설정
      const decodedToken = jwtDecode(payload)
      context.commit('setTokenUser', decodedToken)
    }
  }
}
