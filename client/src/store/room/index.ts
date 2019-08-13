import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { RoomState } from './types'
import { RootState } from '@/types'

export const state: RoomState = {
  room_id: ''
}

const namespaced: boolean = true

export const room: Module<RoomState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
