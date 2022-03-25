// import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  Work: {
    id: null,
    name: null,
    device: null,
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
    WorkInsertedResult: null, // 입력 처리 후 결과
    WorkUpdatedResult: null, // 수정 처리 후 결과
    WorkDeletedResult: null, // 삭제처리 후 결과,
    InputMode: null // 입력모드(등록: insert, 수정: update)
  },
  getters: {
    WorkStatusList: state => state.WorkStatusList,
    Work: state => state.Work,
    WorkInsertedResult: state => state.WorkInsertedResult,
    WorkUpdatedResult: state => state.WorkUpdatedResult,
    WorkDeletedResult: state => state.WorkDeletedResult,
    WorkInputMode: state => state.InputMode
  },
  mutations: {
    setWorkStatusList(state, data) {
      state.WorkStatusList = data
    },
    setWork(state, data) {
      state.Work = data
    },
    setWorkInsertedResult(state, data) {
      state.WorkInsertedResult = data
    },
    setWorkUpdatedResult(state, data) {
      state.WorkUpdatedResult = data
    },
    setWorkDeletedResult(state, data) {
      state.WorkDeletedResult = data
    },
    setInputMode(state, data) {
      state.InputMode = data
    }
  },
  actions: {
    // 작업 현황 리스트 조회
    actWorkStatusList(context, payload) {
      const workStatusList = [
        {
          id: 1,
          name: '이주현',
          itemName: '마스크',
          device: '기계1',
          productQuantity: '12',
          startTime: '2021-12-01T00:00:00.000Z',
          endTime: '2021-12-01T00:00:00.000Z'
        },
        {
          id: 2,
          name: '이주현',
          itemName: '마스크',
          device: '기계1',
          productQuantity: '12',
          startTime: '2021-12-01T00:00:00.000Z',
          endTime: '2021-12-01T00:00:00.000Z'
        }
      ]
      context.commit('setWorkStatusList', workStatusList)

      /* RestAPI 호출 */
      /*
      api.get('/serverApi/departments').then(response => {
        const departmentList = response && response.data
        context.commit('setDepartmentList', departmentList)
      })
      */
    },
    // 작업 입력(등록)
    actWorkInsert(context, payload) {
      // 상태값 초기화
      context.commit('setWorkInsertedResult', null)

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        const workInsertedResult = 1
        context.commit('setWorkInsertedResult', workInsertedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      /* RestAPI 호출 */
      /*
      api.post('/serverApi/departments').then(response => {
        const insertedResult = response && response.insertedId
        context.commit('setInsertedResult', insertedResult)
      })
      */
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

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        const workStatusList = [
          {
            id: 1,
            name: '이주현',
            itemName: '마스크',
            device: '기계1',
            productQuantity: '12',
            startTime: '2021-12-01T00:00:00.000Z',
            endTime: '2021-12-01T00:00:00.000Z'
          },
          {
            id: 2,
            name: '이주현',
            itemName: '마스크',
            device: '기계1',
            productQuantity: '12',
            startTime: '2021-12-01T00:00:00.000Z',
            endTime: '2021-12-01T00:00:00.000Z'
          }
        ]

        let work = { ...stateInit.Work }
        for (let i = 0; i < workStatusList.length; i += 1) {
          if (payload === workStatusList[i].id) {
            work = { ...workStatusList[i] }
          }
        }
        context.commit('setWork', work)
      }, 300)

      /* RestAPI 호출 */
      /*
      api.get('/serverApi/departments/${payload}').then(response => {
        const department = response && response.department
        context.commit('setDepartment', department)
      })
      */
    },
    // 작업 수정
    actWorkUpdate(context, payload) {
      // 상태값 초기화
      context.commit('setWorkUpdatedResult', null)

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        const workUpdatedResult = 1
        context.commit('setWorkUpdatedResult', workUpdatedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      /* RestAPI 호출 */
      /*
      api.put('/serverApi/departments/${payload}').then(response => {
        const updatedResult = response && response.updatedCount
        context.commit('setUpdatedResult', updatedResult)
      })
      */
    },
    // 작업 삭제
    actWorkDelete(context, payload) {
      // 상태값 초기화
      context.commit('setWorkDeletedResult', null)

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        const workDeletedResult = 1
        context.commit('setWorkDeletedResult', workDeletedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      /* RestAPI 호출 */
      /*
      api.delete('/serverApi/departments/${payload}').then(response => {
        const deletedResult = response && response.deletedCount
        context.commit('setDeletedResult', deletedResult)
      })
      */
    }
  }
}
