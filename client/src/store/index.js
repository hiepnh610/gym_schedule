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
    },
    deletePlan: (state, id) => {
      for (var i = 0; i < state.listPlans.length; i++) {
        if (state.listPlans[i]._id === id) {
          state.listPlans.splice(i, 1)
        }
      }
    },
    createPlan: (state, data) => {
      state.listPlans.push(data)
    }
  },
  actions: {
    setShowModal: (context, data) => {
      context.commit('showModal', data)
    },
    setListPlans: (context, data) => {
      context.commit('listPlans', data)
    },
    setDeletePlan: (context, data) => {
      context.commit('deletePlan', data)
    },
    setCreatePlan: (context, data) => {
      context.commit('createPlan', data)
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
