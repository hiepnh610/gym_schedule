import { MutationTree } from 'vuex'
import { AuthState } from './types'

export const mutations: MutationTree<AuthState> = {
  token (state: any, token: string): void {
    state.token = token
  }
}
