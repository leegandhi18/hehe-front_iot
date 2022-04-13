import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  WorkHistory: {
    id: null,
    workNum: null,
    name: null,
    machineCode: null,
    itemName: null,
    totalQuantity: null,
    goodQuantity: null,
    badQuantity: null,
    startTime: null,
    endTime: null,
    time: null,
    workStatus: null,
    emoHistory: null
  }
}
export default {
  state: {
    WorkHistoryList: [],
    WorkHistory: { ...stateInit.WorkHistory },
    InsertedResult: null
  },
  getters: {
    WorkHistoryList: state => state.WorkHistoryList,
    WorkHistory: state => state.WorkHistory,
    WorkHistoryInsertedResult: state => state.InsertedResult
  },
  mutations: {
    setWorkHistoryList(state, data) {
      state.WorkHistoryList = data
    },
    setWorkHistory(state, data) {
      state.WorkHistory = data
    },
    setWorkHistoryInsertedResult(state, data) {
      state.WorkHistoryInsertedResult = data
    }
  },
  actions: {
    // 완료이력 리스트 조회
    async actWorkHistoryList(context, payload) {
      /* RestAPI 호출 */
      await api.get('/serverApi/machineHistories').then(response => {
        const workHistoryList = response && response.data && response.data.rows
        context.commit('setWorkHistoryList', workHistoryList)
        console.log('workHistoryList', workHistoryList)
      })
    },
    // 완료이력(등록)
    async actWorkHistoryInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)

      /* RestAPI 호출 */
      await api
        .post('/serverApi/machineHistories', payload)
        .then(response => {
          console.log('payload', payload)
          console.log('response', response)
          const insertedResult = response && response.data && response.data.id
          context.commit('setWorkHistoryInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('WorkHistoryInsert.error', error)
          context.commit('setWorkHistoryInsertedResult', -1)
        })
    },
    // 완료 상세정보 조회
    async actWorkHistoryInfo(context, payload) {
      // 상태값 초기화
      context.commit('setWorkHistory', { ...stateInit.WorkHistory })

      /* RestAPI 호출 */
      await api
        .get(`/serverApi/orders/${payload}`)
        .then(response => {
          const workHistory = response && response.data
          context.commit('setWorkHistory', workHistory)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('WorkHistoryInfo.error', error)
          context.commit('setWorkHistory', -1)
        })
    }
  }
}
