import { ActionTree } from 'vuex'
import { ModalState } from './types'
import { RootState } from '@/types'

export const actions: ActionTree<ModalState, RootState> = {
  setShowBackgroundModal (context: any, data: boolean): any {
    context.commit('showBackgroundModal', data)
  }
}
