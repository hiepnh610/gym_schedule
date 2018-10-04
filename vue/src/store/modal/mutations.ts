import { MutationTree } from 'vuex'
import { ModalState } from './types'

export const mutations: MutationTree<ModalState> = {
  showModalBackdrop (state: any, data: boolean): void {
    state.showModalBackdrop = data
  }
}
