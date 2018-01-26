import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showModal: false,
    listPlans: []
  },
  mutations: {
    showModal: (state, data) => {
      state.showModal = data
    },
    listPlans: (state, data) => {
      state.listPlans = data
    }
  },
  actions: {
    setShowModal: (context, data) => {
      context.commit('showModal', data)
    },
    setListPlans: (context, data) => {
      context.commit('listPlans', data)
    }
  },
  getters: {
    showModal: state => {
      return state.showModal
    },
    listPlans: state => {
      return state.listPlans
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
