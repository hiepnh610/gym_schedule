import { ActionTree } from 'vuex'
import { AvatarState } from './types'
import { RootState } from '@/types'

export const actions: ActionTree<AvatarState, RootState> = {
  setAvatar (context: any, data: string): void {
    context.commit('avatar', data)
  }
}
