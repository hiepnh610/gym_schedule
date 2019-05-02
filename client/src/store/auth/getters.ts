import { GetterTree } from 'vuex'
import { AuthState } from './types'
import { RootState } from '@/types'

export const getters: GetterTree<AuthState, RootState> = {
  token (state: any): string {
    return state.token
  },

  verified (state: any): boolean {
    return state.verified
  }
}
