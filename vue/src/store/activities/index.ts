import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { ActivityState } from './types'
import { RootState } from '@/types'

export const state: ActivityState = {
  listActivities: []
}

const namespaced: boolean = true

export const activities: Module<ActivityState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
