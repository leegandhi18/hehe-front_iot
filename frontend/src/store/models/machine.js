import api from '../apiUtil'

const stateInit = {
  Machine: {
    id: null,
    code: null
  }
}
export default {
  state: {
    MachineList: [],
    Machine: { ...stateInit.MachineList },
    InsertedResult: null, // 입력처리 후 결과
    UpdatedResult: null,
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
      /* 테스트 데이터 세팅 */
      // const machineList = [
      //   { id: 1, code: 'asp001', state: '작동' },
      //   { id: 2, code: 'asp001', state: '정지' }
      // ]
      // context.commit('setMachineList', machineList)

      /* RestAPI 호출 */
      api.get('/serverApi/machines').then(response => {
        const machineList = response && response.data
        context.commit('setMachineList', machineList)
      })
    },
    // 신규 등록
    actMachineInsert(context, payload) {
      context.commit('setInsertedResult', null)
      // setTimeout(() => {
      //   const insertedResult = 1
      //   context.commit('setInsertedResult', insertedResult)
      // }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.
      api
        .post('/serverApi/machines', payload)
        .then(response => {
          console.log('response', response)
          // const insertedResult = response && response.data && response.data.id
          const insertedResult = response && response.data
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserInsert.error', error)
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
    actMachineInfo(context, payload) {
      context.commit('setMachine', { ...stateInit.Machine })

      //테스트 데이터 세팅 //
      // setTimeout(() => {
      //   const machineList = [
      //     { id: 1, code: 'asp0031', state: '작동중' },
      //     { id: 2, code: 'asp004', state: '중지' }
      //   ]

      //   let machine = { ...stateInit.machine }
      //   for (let i = 0; i < machineList.length; i += 1) {
      //     if (payload === machineList[i].id) {
      //       machine = { ...machineList[i] }
      //     }
      //   }
      //   context.commit('setMachine', machine)
      // }, 300)

      /* RestAPI 호출 */
      api
        .get(`/serverApi/machines/${payload}`)
        .then(response => {
          const machine = response && response.data
          context.commit('setMachine', machine)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('DeviceInfo.error', error)
          context.commit('setDevice', -1)
        })
    },
    // 수정
    actMachineUpdate(context, payload) {
      context.commit('setUpdatedResult', null)

      // setTimeout(() => {
      //   const updatedResult = 1
      //   context.commit('setUpdatedResult', updatedResult)
      // }, 300)

      /* RestAPI 호출 */
      api
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
      // setTimeout(() => {
      //   const deletedResult = 1
      //   context.commit('setDeletedResult', deletedResult)
      // }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      /* RestAPI 호출 */
      api
        .delete(`/serverApi/machines/${payload}`)
        .then(response => {
          const deletedResult = response && response.data && response.data.deletedCount
          context.commit('setDeletedResult', deletedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('DeviceDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    }
  }
}
