import api from '../apiUtil'

const stateInit = {
  User: {
    id: null,
    name: null,
    password: null,
    role: null,
    phone: null
  }
}
export default {
  state: {
    UserList: [],
    User: { ...stateInit.User },
    UpdatedResult: null,
    DeletedResult: null
  },
  getters: {
    UserList: state => state.UserList,
    User: state => state.User,
    UserUpdatedResult: state => state.UpdatedResult,
    UserDeletedResult: state => state.DeletedResult
  },
  mutations: {
    setUserList(state, data) {
      state.UserList = data
    },
    setUser(state, data) {
      state.User = data
    },
    setUpdatedResult(state, data) {
      state.UpdatedResult = data
    },
    setDeletedResult(state, data) {
      state.DeletedResult = data
    }
  },
  actions: {
    // 사용자 리스트 조회
    actUserList(context, payload) {
      /* 테스트 데이터 세팅 */
      // const userList = [
      //   {
      //     id: '1',
      //     name: '이주현',
      //     role: '도비',
      //     phone: '010-9248-1198'
      //   }
      // ]
      // context.commit('setUserList', userList)

      /* RestAPI 호출 */
      api.get('/serverApi/users').then(response => {
        const userList = response && response.data && response.data.rows
        context.commit('setUserList', userList)
      })
    },
    // 초기화
    // actUserInit(context, payload) {
    //   context.commit('setUser', { ...stateInit.User })
    // },
    async actUserInfo(context, payload) {
      // 상태값 초기화
      // context.commit('setUser', { ...stateInit.User })
      //테스트 데이터 세팅 //
      // const userList = {
      //   id: '1',
      //   name: '이주현',
      //   role: '도비',
      //   phone: '010-9248-1198'
      // }
      // context.commit('setUser', userList)
      // console.log('userList', userList)

      /* RestAPI 호출 */
      await api
        .get(`/serverApi/users/${payload}`)
        .then(response => {
          const user = response && response.data
          context.commit('setUser', user)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserInfo.error', error)
          context.commit('setUser', -1)
        })
    },
    // 사용자 정보 수정
    async actUserUpdate(context, payload) {
      context.commit('setUpdatedResult', null)

      // setTimeout(() => {
      //   const userUpdatedResult = 1
      //   context.commit('setUserUpdatedResult', userUpdatedResult)
      // }, 300)
      /* RestAPI 호출 */
      await api
        .put(`/serverApi/users/${payload.id}`, payload)
        .then(response => {
          const updatedResult = response && response.data && response.data.updatedCount
          context.commit('setUpdatedResult', updatedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    }
  }
}
