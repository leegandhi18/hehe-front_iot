import Vue from 'vue'
import Vuex from 'vuex'
import Machine from './models/machine'
import Item from './models/item'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Machine,
    Item
  }
})
