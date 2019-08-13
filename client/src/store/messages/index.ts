import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { MessageState } from './types'
import { RootState } from '@/types'

export const state: MessageState = {
  messagesList: []
}

const namespaced: boolean = true

export const storeMessage: Module<MessageState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
