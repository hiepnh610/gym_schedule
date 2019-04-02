import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { ModalState } from './types'
import { RootState } from '@/types'

export const state: ModalState = {
  showModalBackdrop: false,
  showCreateModal: false,
  showUpdateModal: false
}

const namespaced: boolean = true

export const modal: Module<ModalState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
