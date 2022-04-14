import api from '../apiUtil'

const stateInit = {
  Machine: {
    id: null,
    code: null,
    status: null
  }
}
export default {
  state: {
    MachineList: [],
    Machine: { ...stateInit.MachineList },
    InsertedResult: null, // 입력처리 후 결과
    UpdatedResult: null, // 수정처리 후 결과
    DeletedResult: null, // 삭제처리 후 결과
    InputMode: null
  },
  getters: {
    MachineList: state => state.MachineList,
    Machine: state => state.Machine,
    MachineInsertedResult: state => state.InsertedResult,
    MachineUpdatedResult: state => state.UpdatedResult,
    MachineDeletedResult: state => state.DeletedResult,
    MachineInputMode: state => state.InputMode
  },
  mutations: {
    setMachineList(state, data) {
      state.MachineList = data
    },
    setMachine(state, data) {
      state.Machine = data
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
    // 설비 리스트 조회
    actMachineList(context, payload) {
      /* RestAPI 호출 */
      api.get('/serverApi/machines').then(response => {
        console.log('machineList response', response)
        const machineList = response && response.data && response.data.rows
        context.commit('setMachineList', machineList)
      })
    },
    // 신규 등록
    async actMachineInsert(context, payload) {
      context.commit('setInsertedResult', null)
      await api
        .post('/serverApi/machines', payload)
        .then(response => {
          console.log('response', response)
          const insertedResult = response && response.data && response.data.id
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('MachineInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },
    actMachineInit(context, payload) {
      context.commit('setMachine', { ...stateInit.Machine })
    },
    actMachineInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    // 상세 조회
    async actMachineInfo(context, payload) {
      context.commit('setMachine', { ...stateInit.Machine })

      /* RestAPI 호출 */
      await api
        .get(`/serverApi/machines/${payload}`)
        .then(response => {
          const machine = response && response.data
          context.commit('setMachine', machine)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('MachineInfo.error', error)
          context.commit('setMachine', -1)
        })
    },
    // 수정
    async actMachineUpdate(context, payload) {
      context.commit('setUpdatedResult', null)

      /* RestAPI 호출 */
      await api
        .put(`/serverApi/machines/${payload.id}`, payload)
        .then(response => {
          const updatedResult = response && response.data && response.data.updatedCount
          context.commit('setUpdatedResult', updatedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('MachineUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    },
    // 삭제
    actMachineDelete(context, payload) {
      context.commit('setDeletedResult', null)

      /* RestAPI 호출 */
      api
        .delete(`/serverApi/machines/${payload}`)
        .then(response => {
          const deletedResult = response && response.data && response.data.deletedCount
          context.commit('setDeletedResult', deletedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('MachineDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    }
  }
}
