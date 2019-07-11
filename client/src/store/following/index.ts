import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { UserFollowingState } from './types'
import { RootState } from '@/types'

export const state: UserFollowingState = {
  listUsers: []
}

const namespaced: boolean = true

export const userFollowing: Module<UserFollowingState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
