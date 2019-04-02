import { ActionTree } from 'vuex'
import { UserState } from './types'
import { RootState } from '@/types'

export const actions: ActionTree<UserState, RootState> = {
  setUser (context: any, data: UserState): any {
    return context.commit('user', data)
  }
}
