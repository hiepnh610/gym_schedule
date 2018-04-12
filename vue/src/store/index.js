import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showBackgroundModal: false,
    showCreateModal: false,
    showUpdateModal: false,
    listPlans: [],
    listWorkout: []
  },
  mutations: {
    showBackgroundModal: (state, data) => {
      state.showBackgroundModal = data
    },
    showCreateModal: (state, data) => {
      state.showCreateModal = data
    },
    showUpdateModal: (state, data) => {
      state.showUpdateModal = data
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
    },
    updatePlan: (state, data) => {
      for (var i = 0; i < state.listPlans.length; i++) {
        if (state.listPlans[i]._id === data._id) {
          state.listPlans[i].name = data.name
          state.listPlans[i].type = data.type
          state.listPlans[i].frequency = data.frequency
        }
      }
    },
    listWorkout: (state, data) => {
      state.listWorkout = data
    },
    deleteWorkout: (state, id) => {
      for (var i = 0; i < state.listWorkout.length; i++) {
        if (state.listWorkout[i]._id === id) {
          state.listWorkout.splice(i, 1)
        }
      }
    },
    createWorkout: (state, data) => {
      state.listWorkout.push(data)
    }
  },
  actions: {
    setShowBackgroundModal: (context, data) => {
      context.commit('showBackgroundModal', data)
    },
    setShowCreateModal: (context, data) => {
      context.commit('showCreateModal', data)
    },
    setShowUpdateModal: (context, data) => {
      context.commit('showUpdateModal', data)
    },
    setListPlans: (context, data) => {
      context.commit('listPlans', data)
    },
    setDeletePlan: (context, data) => {
      context.commit('deletePlan', data)
    },
    setCreatePlan: (context, data) => {
      context.commit('createPlan', data)
    },
    setUpdatePlan: (context, data) => {
      context.commit('updatePlan', data)
    },
    setListWorkout: (context, data) => {
      context.commit('listWorkout', data)
    },
    setDeleteWorkout: (context, data) => {
      context.commit('deleteWorkout', data)
    },
    setCreateWorkout: (context, data) => {
      context.commit('createWorkout', data)
    }
  },
  getters: {
    showBackgroundModal: state => {
      return state.showBackgroundModal
    },
    showCreateModal: state => {
      return state.showCreateModal
    },
    showUpdateModal: state => {
      return state.showUpdateModal
    },
    listPlans: state => {
      return state.listPlans
    },
    listWorkout: state => {
      return state.listWorkout
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
