import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { ModalState } from './types'

export const state: ModalState = {
  showBackgroundModal: false,
  showCreateModal: false,
  showUpdateModal: false
}

const namespaced: boolean = true

export const modal = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
