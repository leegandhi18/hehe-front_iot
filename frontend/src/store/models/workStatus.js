import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  Work: {
    id: null,
    name: null,
    machineCode: null,
    itemName: null,
    productQuantity: null,
    startTime: null,
    endTime: null
  }
}

export default {
  state: {
    WorkStatusList: [],
    Work: { ...stateInit.Work },
    InsertedResult: null, // 입력 처리 후 결과
    UpdatedResult: null, // 수정 처리 후 결과
    DeletedResult: null, // 삭제처리 후 결과,
    InputMode: null // 입력모드(등록: insert, 수정: update)
  },
  getters: {
    WorkStatusList: state => state.WorkStatusList,
    Work: state => state.Work,
    WorkInsertedResult: state => state.InsertedResult,
    WorkUpdatedResult: state => state.UpdatedResult,
    WorkDeletedResult: state => state.DeletedResult,
    WorkInputMode: state => state.InputMode
  },
  mutations: {
    setWorkStatusList(state, data) {
      state.WorkStatusList = data
    },
    setWork(state, data) {
      state.Work = data
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
    // 작업 현황 리스트 조회
    actWorkStatusList(context, payload) {
      // const workStatusList = [
      //   {
      //     id: 1,
      //     name: '이주현',
      //     machineCode: '기계1',
      //     itemName: '마스크',
      //     productQuantity: '12',
      //     startTime: '2021-12-01T00:00:00.000Z',
      //     endTime: '2021-12-01T00:00:00.000Z'
      //   },
      //   {
      //     id: 2,
      //     name: '이주현',
      //     machineCode: '기계1',
      //     itemName: '마스크',
      //     productQuantity: '12',
      //     startTime: '2021-12-01T00:00:00.000Z',
      //     endTime: '2021-12-01T00:00:00.000Z'
      //   }
      // ]
      // context.commit('setWorkStatusList', workStatusList)

      /* RestAPI 호출 */
      api.get('/serverApi/orders').then(response => {
        console.log('workStatusList response', response)
        const workStatusList = response && response.data && response.data.rows
        context.commit('setWorkStatusList', workStatusList)
      })
    },
    // 작업 입력(등록)
    actWorkInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)

      /* 테스트 데이터 세팅 */
      // setTimeout(() => {
      //   const workInsertedResult = 1
      //   context.commit('setInsertedResult', workInsertedResult)
      // }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      /* RestAPI 호출 */
      api
        .post('/serverApi/orders', payload)
        .then(response => {
          console.log('response', response)
          const insertedResult = response && response.data && response.data.id
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('OrderInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },
    // 작업 현황 초기화
    actWorkInit(context, payload) {
      context.commit('setWork', { ...stateInit.Work })
    },
    // 입력모드 설정
    actWorkInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    // 작업 상세정보 조회
    actWorkInfo(context, payload) {
      // 상태값 초기화
      context.commit('setWork', { ...stateInit.Work })

      // /* 테스트 데이터 세팅 */
      // setTimeout(() => {
      //   const workStatusList = [
      //     {
      //       id: 1,
      //       name: '이주현',
      //       machineCode: '기계1',
      //       itemName: '마스크',
      //       productQuantity: '12',
      //       startTime: '2021-12-01T00:00:00.000Z',
      //       endTime: '2021-12-01T00:00:00.000Z'
      //     },
      //     {
      //       id: 2,
      //       name: '이주현',
      //       machineCode: '기계1',
      //       itemName: '마스크',
      //       productQuantity: '12',
      //       startTime: '2021-12-01T00:00:00.000Z',
      //       endTime: '2021-12-01T00:00:00.000Z'
      //     }
      //   ]

      //   let work = { ...stateInit.Work }
      //   for (let i = 0; i < workStatusList.length; i += 1) {
      //     if (payload === workStatusList[i].id) {
      //       work = { ...workStatusList[i] }
      //     }
      //   }
      //   context.commit('setWork', work)
      // }, 300)

      /* RestAPI 호출 */
      api
        .get(`/serverApi/orders/${payload}`)
        .then(response => {
          const order = response && response.data
          context.commit('setWork', order)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('OrderInfo.error', error)
          context.commit('setWork', -1)
        })
    },
    // 작업 수정
    actWorkUpdate(context, payload) {
      // 상태값 초기화
      context.commit('setUpdatedResult', null)

      /* 테스트 데이터 세팅 */
      // setTimeout(() => {
      //   const workUpdatedResult = 1
      //   context.commit('setWorkUpdatedResult', workUpdatedResult)
      // }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      /* RestAPI 호출 */
      api
        .put(`/serverApi/orders/${payload.id}`, payload)
        .then(response => {
          const updatedResult = response && response.data && response.data.updatedCount
          context.commit('setUpdatedResult', updatedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('OrderUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    },
    // 작업 삭제
    actWorkDelete(context, payload) {
      // 상태값 초기화
      context.commit('setDeletedResult', null)

      /* 테스트 데이터 세팅 */
      // setTimeout(() => {
      //   const workDeletedResult = 1
      //   context.commit('setWorkDeletedResult', workDeletedResult)
      // }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      /* RestAPI 호출 */
      api
        .delete(`/serverApi/orders/${payload}`)
        .then(response => {
          const deletedResult = response && response.data && response.data.deletedCount
          context.commit('setDeletedResult', deletedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('OrderDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    }
  }
}
