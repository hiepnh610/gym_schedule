import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { UserState } from './types'
import { RootState } from '@/types'

export const state: UserState = {
  _id: '',
  email: '',
  full_name: '',
  username: ''
}

const namespaced: boolean = true

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
