// import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  WorkHistory: {
    id: null,
    name: null,
    device: null,
    item: null,
    num: null,
    good: null,
    bad: null,
    startTime: null,
    endTime: null
  }
}
export default {
  state: {
    WorkHistoryList: [],
    WorkHistory: { ...stateInit.WorkHistory }
  },
  getters: {
    WorkHistoryList: state => state.WorkHistoryList,
    WorkHistory: state => state.Work
  },
  mutations: {
    setWorkHistoryList(state, data) {
      state.WorkHistoryList = data
    },
    setWorkHistory(state, data) {
      state.WorkHistory = data
    }
  },
  actions: {
    // 완료이력 리스트 조회
    actWorkHistoryList(context, payload) {
      const workHistoryList = [
        {
          id: '1',
          name: '이주현',
          device: 'ASP001',
          item: '마스크',
          num: '1004',
          good: '1004',
          bad: '0',
          startTime: '2022-03-22 09:00',
          endTime: '2022-03-22 18:00'
        },
        {
          id: '2',
          name: '이다운',
          device: 'ASP002',
          item: '마스크',
          num: '104',
          good: '0',
          bad: '104',
          startTime: '2022-03-22 09:00',
          endTime: '2022-03-22 18:00'
        },
        {
          id: '3',
          name: '유지영',
          device: 'ASP003',
          item: '마스크',
          num: '10',
          good: '5',
          bad: '5',
          startTime: '2022-03-22 09:00',
          endTime: '2022-03-22 18:00'
        },
        {
          id: '4',
          name: '김예찬',
          device: 'ASP004',
          item: '마스크',
          num: '999',
          good: '998',
          bad: '1',
          startTime: '2022-03-22 09:00',
          endTime: '2022-03-22 18:00'
        }
      ]
      context.commit('setWorkHistoryList', workHistoryList)

      /* RestAPI 호출 */
      /*
      api.get('/serverApi/departments').then(response => {
        const departmentList = response && response.data
        context.commit('setDepartmentList', departmentList)
      })
      */
    },
    // 완료이력 상세정보 조회
    actWorkHistoryInfo(context, payload) {
      // 상태값 초기화
      context.commit('setWorkHistory', { ...stateInit.WorkHistory })

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        const workHistoryList = [
          {
            id: '1',
            name: '이주현',
            device: 'ASP001',
            item: '마스크',
            num: '1004',
            good: '1004',
            bad: '0',
            startTime: '2022-03-22 09:00',
            endTime: '2022-03-22 18:00'
          },
          {
            id: '2',
            name: '이다운',
            device: 'ASP002',
            item: '마스크',
            num: '104',
            good: '0',
            bad: '104',
            startTime: '2022-03-22 09:00',
            endTime: '2022-03-22 18:00'
          },
          {
            id: '3',
            name: '유지영',
            device: 'ASP003',
            item: '마스크',
            num: '10',
            good: '5',
            bad: '5',
            startTime: '2022-03-22 09:00',
            endTime: '2022-03-22 18:00'
          },
          {
            id: '4',
            name: '김예찬',
            device: 'ASP004',
            item: '마스크',
            num: '999',
            good: '998',
            bad: '1',
            startTime: '2022-03-22 09:00',
            endTime: '2022-03-22 18:00'
          }
        ]

        let workHistory = { ...stateInit.WorkHistory }
        for (let i = 0; i < workHistoryList.length; i += 1) {
          if (payload === workHistoryList[i].id) {
            workHistory = { ...workHistoryList[i] }
          }
        }
        context.commit('setWorkHistory', workHistory)
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
