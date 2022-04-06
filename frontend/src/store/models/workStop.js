import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  WorkStop: {
    id: null,
    workNum: null,
    name: null,
    machineCode: null,
    time: null,
    workStatus: null
  }
}
export default {
  state: {
    WorkStopList: [],
    WorkStop: { ...stateInit.WorkStop }
  },
  getters: {
    WorkStopList: state => state.WorkStopList,
    WorkStop: state => state.WorkStop,
    InsertedResult: state => state.InsertedResult
  },
  mutations: {
    setWorkStopList(state, data) {
      state.WorkStopList = data
    },
    setWorkStop(state, data) {
      state.WorkStop = data
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data
    }
  },
  actions: {
    // 중단이력 조회
    actWorkStopList(context, payload) {
      /* RestAPI 호출 */
      api.get('/serverApi/emoHistories').then(response => {
        const workStopList = response && response.data && response.data.rows
        context.commit('setWorkStopList', workStopList)
        console.log('workStopList', workStopList)
      })
    },
    // 중단이력(등록)
    actWorkStopInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)

      /* RestAPI 호출 */
      api
        .post('/serverApi/emoHistories', payload)
        .then(response => {
          console.log('insert payload', payload)
          console.log('insert response', response)
          const insertedResult = response && response.data && response.data.id
          context.commit('setInsertedResult', insertedResult)
          console.log('insertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('WorkStopInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },
    // 중단이력 상세정보 조회
    actWorkStopInfo(context, payload) {
      // 상태값 초기화
      context.commit('setWorkStop', { ...stateInit.WorkStop })

      /* RestAPI 호출 */
      api
        .get(`/serverApi/emoHistories/${payload}`)
        .then(response => {
          const workStop = response && response.data
          context.commit('setWorkStop', workStop)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('WorkStopInfo.error', error)
          context.commit('setWorkStop', -1)
        })
    }
  }
}
