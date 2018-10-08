import { GetterTree } from 'vuex'
import { AvatarState } from './types'
import { RootState } from '@/types'

export const getters: GetterTree<AvatarState, RootState> = {
  avatar(state: any): string {
    return state.avatar
  }
}
