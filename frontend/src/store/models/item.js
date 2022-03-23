const stateInit = {
  Item: {
    id: null,
    item: null,
    num: null,
    btn: null
  }
}
export default {
  state: {
    ItemList: [],
    Item: { ...stateInit.ItemList },
    InsertedResult: null, // 입력처리 후 결과
    UpdatedResult: null,
    DeletedResult: null, // 삭제처리 후 결과
    InputMode: null
  },
  getters: {
    ItemList: state => state.ItemList,
    Item: state => state.Item,
    ItemInsertedResult: state => state.InsertedResult,
    ItemUpdatedResult: state => state.UpdatedResult,
    ItemDeletedResult: state => state.DeletedResult,
    ItemInputMode: state => state.InputMode
  },
  mutations: {
    setItemList(state, data) {
      state.ItemList = data
    },
    setItem(state, data) {
      state.Item = data
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
    actItemList(context, payload) {
      /* 테스트 데이터 세팅 */
      const itemList = [
        { id: 1, item: '마스크', num: '100', btn: '' },
        { id: 2, item: '마스크2', num: '999', btn: '' }
      ]
      context.commit('setItemList', itemList)

      /* RestAPI 호출 */
      /*
        api.get('/serverApi/Items').then(response => {
          const ItemList = response && response.data
          context.commit('setItemList', ItemList)
        })
        */
    },
    actItemInsert(context, payload) {
      context.commit('setInsertedResult', null)
      setTimeout(() => {
        const insertedResult = 1
        context.commit('setInsertedResult', insertedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.
    },
    actItemInit(context, payload) {
      context.commit('setItem', { ...stateInit.Item })
    },
    actItemInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    actItemInfo(context, payload) {
      context.commit('setItem', { ...stateInit.Item })

      //테스트 데이터 세팅 //
      setTimeout(() => {
        const itemList = [
          { id: 1, item: '마스크', num: '1004' },
          { id: 2, item: '마스크2', num: '2005' }
        ]

        let item = { ...stateInit.item }
        for (let i = 0; i < itemList.length; i += 1) {
          if (payload === itemList[i].id) {
            item = { ...itemList[i] }
          }
        }
        context.commit('setItem', item)
      }, 300)
    },
    actItemUpdate(context, payload) {
      context.commit('setUpdatedResult', null)

      setTimeout(() => {
        const updatedResult = 1
        context.commit('setUpdatedResult', updatedResult)
      }, 300)
    },
    actItemDelete(context, payload) {
      context.commit('setDeletedResult', null)
      setTimeout(() => {
        const deletedResult = 1
        context.commit('setDeletedResult', deletedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.
    }
  }
}
