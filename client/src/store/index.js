import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showModal: false
  },
  mutations: {
    showModal: (state, data) => {
      state.showModal = data
    }
  },
  actions: {
    setShowModal: (context, data) => {
      context.commit('showModal', data)
    }
  },
  getters: {
    showModal: state => {
      return state.showModal
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
