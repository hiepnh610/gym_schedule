import { MutationTree } from 'vuex'
import { AvatarState } from './types'

export const mutations: MutationTree<AvatarState> = {
  avatar (state: any, data: any): void {
    state.avatar = data
  }
}
