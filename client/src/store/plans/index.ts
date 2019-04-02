import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { PlanState } from './types'
import { RootState } from '@/types'

export const state: PlanState = {
  listPlans: []
}

const namespaced: boolean = true

export const plans: Module<PlanState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
