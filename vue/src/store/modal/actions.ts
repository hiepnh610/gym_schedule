import { ActionTree } from 'vuex'
import { ModalState } from './types'
import { RootState } from '@/types'

export const actions: ActionTree<ModalState, RootState> = {
  setShowModalBackdrop (context: any, data: boolean): any {
    context.commit('showModalBackdrop', data)
  },

  setShowCreateModal (context: any, data: boolean): any {
    context.commit('showCreateModal', data)
  },

  setShowUpdateModal (context: any, data: boolean): any {
    context.commit('showUpdateModal', data)
  }
}
