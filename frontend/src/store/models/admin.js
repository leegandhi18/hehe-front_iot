import api from '../apiUtil'

const stateInit = {
  Admin: {
    id: null,
    password: null,
    name: null,
    role: null,
    phone: null
  }
}
export default {
  state: {
    AdminList: [],
    Admin: { ...stateInit.AdminList },
    IdCheckResult: null, // 이름 중복체크 후 결과
    ButtonResult: null, // 버튼 클릭 체크
    InsertedResult: null, // 입력처리 후 결과
    UpdatedResult: null, // 수정처리 후 결과
    DeletedResult: null, // 삭제처리 후 결과
    InputMode: null
  },
  getters: {
    AdminList: state => state.AdminList,
    Admin: state => state.Admin,
    IdCheckResult: state => state.IdCheckResult,
    ButtonResult: state => state.ButtonResult,
    AdminInsertedResult: state => state.InsertedResult,
    AdminUpdatedResult: state => state.UpdatedResult,
    AdminDeletedResult: state => state.DeletedResult,
    AdminInputMode: state => state.InputMode
  },
  mutations: {
    setAdminList(state, data) {
      state.AdminList = data
    },
    setAdmin(state, data) {
      state.Admin = data
    },
    setButtonResult(state, data) {
      state.ButtonResult = data
    },
    setIdCheckResult(state, data) {
      state.IdCheckResult = data
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data
    },
    setUpdatedResult(state, data) {
      state.UpdatedResult = data
    },
    setDeletedResult(state, data) {
      state.DeletedResult = data
    },
    setInputMode(state, data) {
      state.InputMode = data
    }
  },
  actions: {
    // 사용자 리스트 조회
    async actAdminList(context, payload) {
      /* RestAPI 호출 */
      await api
        .get('/serverApi/users')
        .then(response => {
          const userList = response && response.data && response.data.rows
          // console.log('response', response)
          context.commit('setAdminList', userList)
          // console.log('userList', userList)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserList.error', error)
          context.commit('setAdminList', [])
        })
    },
    async actButtonResult(context, payload) {
      context.commit('setButtonResult', 0)
    },
    async actIdCheck(context, payload) {
      /* RestAPI 호출 */
      await api
        .post(`/serverApi/users/idCheck/${payload}`)
        .then(response => {
          console.log('idCheck response', response)
          const idCheckedResult = response && response.data && response.data.name
          context.commit('setIdCheckResult', idCheckedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('IdCheck.error', error)
          context.commit('setIdCheckResult', -1)
        })
    },
    async actAdminInsert(context, payload) {
      context.commit('setInsertedResult', null)
      /* RestAPI 호출 */
      await api
        .post('/serverApi/users', payload)
        .then(response => {
          console.log('insert response', response)
          const insertedResult = response && response.data && response.data.id
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },
    actAdminInit(context, payload) {
      context.commit('setAdmin', { ...stateInit.Admin })
    },
    actAdminInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    actAdminInfo(context, payload) {
      context.commit('setAdmin', { ...stateInit.Admin })
      /* RestAPI 호출 */
      api
        .get(`/serverApi/users/${payload}`)
        .then(response => {
          const user = response && response.data
          context.commit('setAdmin', user)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserInfo.error', error)
          context.commit('setAdmin', -1)
        })
    },
    actAdminUpdate(context, payload) {
      context.commit('setUpdatedResult', null)
      // setTimeout(() => {
      //   const updatedResult = 1
      //   context.commit('setUpdatedResult', updatedResult)
      // }, 300)
      /* RestAPI 호출 */
      api
        .put(`/serverApi/users/${payload.id}`, payload)
        .then(response => {
          console.log(payload)
          console.log('user update response data', response.data)
          const updatedResult = response && response.data && response.data.updatedCount
          context.commit('setUpdatedResult', updatedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    },
    actAdminDelete(context, payload) {
      context.commit('setDeletedResult', null)
      // setTimeout(() => {
      //   const deletedResult = 1
      //   context.commit('setDeletedResult', deletedResult)
      // }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      /* RestAPI 호출 */
      api
        .delete(`/serverApi/users/${payload}`)
        .then(response => {
          const deletedResult = response && response.data && response.data.deletedCount
          context.commit('setDeletedResult', deletedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    }
  }
}
