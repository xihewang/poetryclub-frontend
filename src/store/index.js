import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import state from './state'
import profile from './modules/profile'
import inbox from './modules/inbox'
import poem from './modules/poem'
import scout from './modules/scout'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    profile,
    inbox,
    poem,
    scout
  }
})
export default store
