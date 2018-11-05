import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { HistoryState } from './types'
import { RootState } from '@/types'

export const state: HistoryState = {
  listHistories: []
}

const namespaced: boolean = true

export const histories: Module<HistoryState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
