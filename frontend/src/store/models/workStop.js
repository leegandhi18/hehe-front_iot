// import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  WorkStop: {
    name: null,
    device: null,
    stopTime: null
  }
}
export default {
  state: {
    WorkStopList: [],
    WorkStop: { ...stateInit.WorkStop }
  },
  getters: {
    WorkStopList: state => state.WorkStopList,
    WorkStop: state => state.WorkStop
  },
  mutations: {
    setWorkStopList(state, data) {
      state.WorkStopList = data
    },
    setWorkStop(state, data) {
      state.WorkStop = data
    }
  },
  actions: {
    // 중단이력 조회
    actWorkStopList(context, payload) {
      const workStopList = [
        {
          name: '이주현',
          device: 'ASP001',
          stopTime: '2022-03-22 18:00'
        },
        {
          name: '이다운',
          device: 'ASP002',
          stopTime: '2022-03-22 18:00'
        }
      ]
      context.commit('setWorkStopList', workStopList)

      /* RestAPI 호출 */
      /*
      api.get('/serverApi/departments').then(response => {
        const departmentList = response && response.data
        context.commit('setDepartmentList', departmentList)
      })
      */
    },
    // 중단이력 상세정보 조회
    actWorkStopInfo(context, payload) {
      // 상태값 초기화
      context.commit('setWorkStop', { ...stateInit.WorkStop })

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        const workStopList = [
          {
            id: '1',
            name: '이주현',
            device: 'ASP001',
            stopTime: '2022-03-22 18:00'
          },
          {
            id: '2',
            name: '이다운',
            device: 'ASP002',
            stopTime: '2022-03-22 18:00'
          }
        ]

        let workStop = { ...stateInit.WorkStop }
        for (let i = 0; i < workStopList.length; i += 1) {
          if (payload === workStopList[i].id) {
            workStop = { ...workStopList[i] }
          }
        }
        context.commit('setWorkStop', workStop)
      }, 300)

      /* RestAPI 호출 */
      /*
      api.get('/serverApi/departments/${payload}').then(response => {
        const department = response && response.department
        context.commit('setDepartment', department)
      })
      */
    }
  }
}
