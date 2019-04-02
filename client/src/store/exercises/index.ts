import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { ExerciseState } from './types'
import { RootState } from '@/types'

export const state: ExerciseState = {
  listExercises: []
}

const namespaced: boolean = true

export const exercises: Module<ExerciseState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
