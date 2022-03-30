import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './models/auth'
import Machine from './models/machine'
import Item from './models/item'
import Admin from './models/admin'
import User from './models/user'
import WorkStatus from './models/workStatus'
import WorkHistory from './models/workHistory'
import WorkStop from './models/workStop'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    User,
    Machine,
    Item,
    Admin,
    WorkStatus,
    WorkHistory,
    WorkStop
  }
})
