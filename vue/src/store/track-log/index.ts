import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { TrackLogState } from './types'
import { RootState } from '@/types'

export const state: TrackLogState = {
  listTrackLog: []
}

const namespaced: boolean = true

export const trackLog: Module<TrackLogState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
