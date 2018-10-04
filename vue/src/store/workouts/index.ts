import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { WorkoutState } from './types'
import { RootState } from '@/types'

export const state: WorkoutState = {
  listWorkouts: []
}

const namespaced: boolean = true

export const workouts: Module<WorkoutState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
