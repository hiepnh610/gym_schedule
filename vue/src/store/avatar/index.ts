import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { AvatarState } from './types'
import { RootState } from '@/types'

export const state: AvatarState = {
  avatar: ''
}

const namespaced: boolean = true

export const avatar: Module<AvatarState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
