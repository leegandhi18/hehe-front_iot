import Vue from 'vue'
import Vuex from 'vuex'
import Machine from './models/machine'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Machine
  }
})
