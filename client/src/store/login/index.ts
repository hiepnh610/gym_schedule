import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { LoginState } from './types'
import { RootState } from '@/types'

export const state: LoginState = {
  isLogin: false
}

const namespaced: boolean = true

export const loginStatus: Module<LoginState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
