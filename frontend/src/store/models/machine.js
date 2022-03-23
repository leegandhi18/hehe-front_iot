const stateInit = {
  Department: {
    id: null,
    device: null,
    state: null,
    btn: null
  }
}
export default {
  state: {
    MachineList: [],
    Machine: { ...stateInit.MachineList },
    InsertedResult: null // 입력처리 후 결과
  },
  getters: {
    MachineList: state => state.MachineList,
    Machine: state => state.Machine,
    MachineInsertedResult: state => state.InsertedResult
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
    }
  },
  actions: {
    // 부서 리스트 조회
    actMachineList(context, payload) {
      /* 테스트 데이터 세팅 */
      const machineList = [
        { id: 1, device: 'asp001', state: '작동', btn: '' },
        { id: 2, device: 'asp001', state: '정지', btn: '' }
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
    }
  }
}
