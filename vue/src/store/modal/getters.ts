import { GetterTree } from 'vuex'
import { ModalState } from './types'
import { RootState } from '@/types'

export const getters: GetterTree<ModalState, RootState> = {
  showModalBackdrop (state: any): boolean {
    return state.showModalBackdrop
  },

  showCreateModal (state: any): boolean {
    return state.showCreateModal
  }
}
