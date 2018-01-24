import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showCreateModal: false
  },
  mutations: {
    showCreateModal: (state, data) => {
      state.showCreateModal = data
    }
  },
  actions: {
    setShowCreateModal: (context, data) => {
      context.commit('showCreateModal', data)
    }
  },
  getters: {
    showCreateModal: state => {
      return state.showCreateModal
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
