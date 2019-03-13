import { GetterTree } from 'vuex'
import { UserState } from './types'
import { RootState } from '@/types'

export const getters: GetterTree<UserState, RootState> = {
  user (state: any): UserState {
    return state
  }
}
