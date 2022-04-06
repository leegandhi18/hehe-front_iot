import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  WorkState: {
    id: null,
    workStatus: null
  }
}

export default {
  state: {
    WorkState: [],
    InsertedResult: null // 입력 처리 후 결과
  },
  getters: {
    WorkState: state => state.WorkState,
    WorkStateInsertedResult: state => state.InsertedResult
  },
  mutations: {
    setWorkState(state, data) {
      state.WorkState = data
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data
    }
  },
  actions: {
    // 작업 상태 조회
    actWorkState(context, payload) {
      /* RestAPI 호출 */
      api.get('/serverApi/orders').then(response => {
        const workState = response && response.data && response.data.rows && response.data.rows[0].workStatus
        console.log('workState', workState)
        context.commit('setWorkState', workState)
      })
    },
    // 작업상태 입력(등록)
    actWorkStateInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)

      /* RestAPI 호출 */
      api
        .post('/serverApi/workStatuses', payload)
        .then(response => {
          console.log('payload', payload)
          console.log('response', response)
          const insertedResult = response && response.data && response.data.id
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('WorkStateInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },
    // 작업상태 상세정보 조회
    actWorkStateInfo(context, payload) {
      // 상태값 초기화
      context.commit('setWorkState', { ...stateInit.WorkState })

      /* RestAPI 호출 */
      api
        .get(`/serverApi/workStatuses/${payload}`)
        .then(response => {
          const workState = response && response.data
          context.commit('setWorkState', workState)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('WorkStateInfo.error', error)
          context.commit('setWorkState', -1)
        })
    },
    // 작업 수정
    actWorkStateUpdate(context, payload) {
      // 상태값 초기화
      context.commit('setUpdatedResult', null)

      /* RestAPI 호출 */
      api
        .put(`/serverApi/workStatuses/${payload.id}`, payload)
        .then(response => {
          const updatedResult = response && response.data && response.data.updatedCount
          context.commit('setUpdatedResult', updatedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('WorkStateUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    }
    // // 작업 삭제
    // actWorkDelete(context, payload) {
    //   // 상태값 초기화
    //   context.commit('setDeletedResult', null)

    //   /* 테스트 데이터 세팅 */
    //   // setTimeout(() => {
    //   //   const workDeletedResult = 1
    //   //   context.commit('setWorkDeletedResult', workDeletedResult)
    //   // }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

    //   /* RestAPI 호출 */
    //   api
    //     .delete(`/serverApi/orders/${payload}`)
    //     .then(response => {
    //       const deletedResult = response && response.data && response.data.deletedCount
    //       context.commit('setDeletedResult', deletedResult)
    //     })
    //     .catch(error => {
    //       // 에러인 경우 처리
    //       console.error('OrderDelete.error', error)
    //       context.commit('setDeletedResult', -1)
    //     })
    // }
  }
}
