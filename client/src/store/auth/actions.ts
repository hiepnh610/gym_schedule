import { ActionTree } from 'vuex'
import { AuthState } from './types'
import { RootState } from '@/types'

export const actions: ActionTree<AuthState, RootState> = {
  setToken (context: any, token: string): any {
    return context.commit('token', token)
  },

  setVerified (context: any, verified: boolean): any {
    return context.commit('verified', verified)
  }
}
