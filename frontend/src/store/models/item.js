import api from '../apiUtil'

const stateInit = {
  Item: {
    id: null,
    name: null,
    quantity: null,
    itemId: null,
    machineCode: null,
    No2Mode: null,
    DiceComparisonValue: null
  }
}
export default {
  state: {
    ItemList: [],
    Item: { ...stateInit.ItemList },
    InsertedResult: null, // 입력처리 후 결과
    QuantityUpdate: null, // 작업중단, 작업완료 후 수량 갱신
    UpdatedResult: null,
    DeletedResult: null, // 삭제처리 후 결과
    InputMode: null
  },
  getters: {
    ItemList: state => state.ItemList,
    Item: state => state.Item,
    ItemInsertedResult: state => state.InsertedResult,
    ItemQuantityUpdate: state => state.QuantityUpdate,
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
    setQuantityUpdate(state, data) {
      state.QuantityUpdate = data
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
      /* RestAPI 호출 */
      api.get('/serverApi/items').then(response => {
        const itemList = response && response.data && response.data.rows
        // console.log('response.data.rows', response.data.rows)
        context.commit('setItemList', itemList)
      })
    },
    async actItemInsert(context, payload) {
      context.commit('setInsertedResult', null)
      /* RestAPI 호출 */
      await api
        .post('/serverApi/items', payload)
        .then(response => {
          // console.log('response', response)
          const insertedResult = response && response.data && response.data.id
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('ItemInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },
    actItemInit(context, payload) {
      context.commit('setItem', { ...stateInit.Item })
    },
    actItemInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    async actItemInfo(context, payload) {
      context.commit('setItem', { ...stateInit.Item })
      /* RestAPI 호출 */
      await api
        .get(`/serverApi/items/${payload}`)
        .then(response => {
          const item = response && response.data
          context.commit('setItem', item)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('ItemInfo.error', error)
          context.commit('setItem', -1)
        })
    },
    async actProductInfo(context, payload) {
      context.commit('setItem', { ...stateInit.Item })
      /* RestAPI 호출 */
      await api
        .get(`/serverApi/items/product/${payload}`)
        .then(response => {
          const item = response && response.data
          context.commit('setItem', item)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('ProductInfo.error', error)
          context.commit('setItem', -1)
        })
    },
    async actItemQuantityUpdate(context, payload) {
      // context.commit('setQuantityUpdate', null)
      console.log('payload', payload)
      /* RestAPI 호출 */
      // await api
      await api
        .put('/serverApi/items/quantityUpdate', payload)
        .then(response => {
          const quantityUpdate = response && response.data && response.data.updatedCount
          context.commit('setQuantityUpdate', quantityUpdate)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('ItemQuantityUpdate.error', error)
          context.commit('setQuantityUpdate', -1)
        })
    },
    async actItemUpdate(context, payload) {
      context.commit('setUpdatedResult', null)
      // console.log('payload', payload)
      /* RestAPI 호출 */
      await api
        .put(`/serverApi/items/${payload.id}`, payload)
        .then(response => {
          const updatedResult = response && response.data && response.data.updatedCount
          context.commit('setUpdatedResult', updatedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('ItemUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    },
    actItemDelete(context, payload) {
      context.commit('setDeletedResult', null)
      /* RestAPI 호출 */
      api
        .delete(`/serverApi/items/${payload}`)
        .then(response => {
          const deletedResult = response && response.data && response.data.deletedCount
          context.commit('setDeletedResult', deletedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('ItemDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    }
  }
}
