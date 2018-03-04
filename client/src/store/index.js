import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showBackgroundModal: false,
    showCreateModal: false,
    listPlans: []
  },
  mutations: {
    showBackgroundModal: (state, data) => {
      state.showBackgroundModal = data
    },
    showCreateModal: (state, data) => {
      state.showCreateModal = data
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
    setShowBackgroundModal: (context, data) => {
      context.commit('showBackgroundModal', data)
    },
    setShowCreateModal: (context, data) => {
      context.commit('showCreateModal', data)
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
    showBackgroundModal: state => {
      return state.showBackgroundModal
    },
    showCreateModal: state => {
      return state.showCreateModal
    },
    listPlans: state => {
      return state.listPlans
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
