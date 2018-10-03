import { MutationTree } from 'vuex'
import { ModalState } from './types'

export const mutations: MutationTree<ModalState> = {
  showBackgroundModal (state: any, data: boolean): void {
    state.showBackgroundModal = data
  }
}
