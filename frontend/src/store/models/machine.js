const stateInit = {
  Machine: {
    id: null,
    code: null,
    state: null,
    btn: null
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
    // 부서 리스트 조회
    actMachineList(context, payload) {
      /* 테스트 데이터 세팅 */
      const machineList = [
        { id: 1, code: 'asp001', state: '작동' },
        { id: 2, code: 'asp001', state: '정지' }
      ]
      context.commit('setMachineList', machineList)

      /* RestAPI 호출 */
      /*
      api.get('/serverApi/Machines').then(response => {
        const MachineList = response && response.data
        context.commit('setMachineList', MachineList)
      })
      */
    },
    actMachineInsert(context, payload) {
      context.commit('setInsertedResult', null)
      setTimeout(() => {
        const insertedResult = 1
        context.commit('setInsertedResult', insertedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.
    },
    actMachineInit(context, payload) {
      context.commit('setMachine', { ...stateInit.Machine })
    },
    actMachineInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    actMachineInfo(context, payload) {
      context.commit('setMachine', { ...stateInit.Machine })

      //테스트 데이터 세팅 //
      setTimeout(() => {
        const machineList = [
          { id: 1, code: 'asp0031', state: '작동중' },
          { id: 2, code: 'asp004', state: '중지' }
        ]

        let machine = { ...stateInit.machine }
        for (let i = 0; i < machineList.length; i += 1) {
          if (payload === machineList[i].id) {
            machine = { ...machineList[i] }
          }
        }
        context.commit('setMachine', machine)
      }, 300)
    },
    actMachineUpdate(context, payload) {
      context.commit('setUpdatedResult', null)

      setTimeout(() => {
        const updatedResult = 1
        context.commit('setUpdatedResult', updatedResult)
      }, 300)
    },
    actMachineDelete(context, payload) {
      context.commit('setDeletedResult', null)
      setTimeout(() => {
        const deletedResult = 1
        context.commit('setDeletedResult', deletedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.
    }
  }
}
