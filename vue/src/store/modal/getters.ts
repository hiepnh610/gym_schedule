import { GetterTree } from 'vuex'
import { ModalState } from './types'
import { RootState } from '@/types'

export const getters: GetterTree<ModalState, RootState> = {
  showBackgroundModal (state): boolean {
    return state.showBackgroundModal
  }
}
