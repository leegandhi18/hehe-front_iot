import api from '../apiUtil'

const stateInit = {
  Admin: {
    id: null,
    name: null,
    btn: null
  }
}
export default {
  state: {
    AdminList: [],
    Admin: { ...stateInit.AdminList },
    InsertedResult: null, // 입력처리 후 결과
    UpdatedResult: null,
    DeletedResult: null, // 삭제처리 후 결과
    InputMode: null
  },
  getters: {
    AdminList: state => state.AdminList,
    Admin: state => state.Admin,
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
    // 부서 리스트 조회
    actAdminList(context, payload) {
      /* 테스트 데이터 세팅 */
      const adminList = [
        { id: 1, name: '이주현', phone: '010-9248-1198', btn: '' },
        { id: 2, name: '주먹왕', phone: '010-2222-1111', btn: '' }
      ]
      context.commit('setAdminList', adminList)

      /* RestAPI 호출 */
      /*
        api.get('/serverApi/Admins').then(response => {
          const AdminList = response && response.data
          context.commit('setAdminList', AdminList)
        })
        */
    },
    actAdminInsert(context, payload) {
      context.commit('setInsertedResult', null)
      setTimeout(() => {
        const insertedResult = 1
        context.commit('setInsertedResult', insertedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.
    },
    actAdminInit(context, payload) {
      context.commit('setAdmin', { ...stateInit.Admin })
    },
    actAdminInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    actAdminInfo(context, payload) {
      context.commit('setAdmin', { ...stateInit.Admin })

      //테스트 데이터 세팅 //
      setTimeout(() => {
        const adminList = [
          { id: 1, name: '이주현', phone: '010-9248-1198' },
          { id: 2, name: '주먹왕', phone: '010-2222-1111' }
        ]

        let admin = { ...stateInit.Admin }
        for (let i = 0; i < adminList.length; i += 1) {
          if (payload === adminList[i].id) {
            admin = { ...adminList[i] }
          }
        }
        context.commit('setAdmin', admin)
      }, 300)
    },
    actAdminUpdate(context, payload) {
      context.commit('setUpdatedResult', null)

      setTimeout(() => {
        const updatedResult = 1
        context.commit('setUpdatedResult', updatedResult)
      }, 300)
    },
    actAdminDelete(context, payload) {
      context.commit('setDeletedResult', null)
      setTimeout(() => {
        const deletedResult = 1
        context.commit('setDeletedResult', deletedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.
    }
  }
}
