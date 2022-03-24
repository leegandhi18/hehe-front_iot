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
    UpdatedResult: null
  },
  getters: {
    UserList: state => state.UserList,
    User: state => state.User,
    UserUpdatedResult: state => state.UserUpdatedResult
  },
  mutations: {
    setUserList(state, data) {
      state.UserList = data
    },
    setUser(state, data) {
      state.User = data
    },
    setUserUpdatedResult(state, data) {
      state.UserUpdatedResult = data
    }
  },
  actions: {
    // 부서 리스트 조회
    actUserList(context, payload) {
      /* 테스트 데이터 세팅 */
      const userList = [
        {
          id: '1',
          name: '이주현',
          role: '도비',
          phone: '010-9248-1198'
        }
      ]
      context.commit('setUserList', userList)

      /* RestAPI 호출 */
      /*
        api.get('/serverApi/Admins').then(response => {
          const AdminList = response && response.data
          context.commit('setAdminList', AdminList)
        })
        */
    },
    actUserInfo(context, payload) {
      // 상태값 초기화
      context.commit('setUser', { ...stateInit.User })
      //테스트 데이터 세팅 //
      setTimeout(() => {
        const userList = [
          {
            id: '1',
            name: '이주현',
            role: '도비',
            phone: '010-9248-1198'
          }
        ]

        let user = { ...stateInit.User }
        console.log('payload', payload)
        for (let i = 0; i < userList.length; i += 1) {
          if (payload === userList[i].id) {
            user = { ...userList[i] }
          }
        }
        context.commit('setUser', user)
        console.log('userList', userList)
        console.log('user', user)
      }, 300)

      /* RestAPI 호출 */
      /*
      api.get('/serverApi/departments/${payload}').then(response => {
        const department = response && response.department
        context.commit('setDepartment', department)
      })
      */
    },
    actUserUpdate(context, payload) {
      context.commit('setUserUpdatedResult', null)

      setTimeout(() => {
        const userUpdatedResult = 1
        context.commit('setUserUpdatedResult', userUpdatedResult)
      }, 300)
    }
  }
}
