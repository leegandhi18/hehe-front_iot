import Vue from 'vue'
import Vuex from 'vuex'
import Machine from './models/machine'
import Item from './models/item'
import Admin from './models/admin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Machine,
    Item,
    Admin
  }
})
