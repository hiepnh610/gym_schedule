import { MutationTree } from 'vuex'
import { LoginState } from './types'

export const mutations: MutationTree<LoginState> = {
  loginStatus (state: any, data: boolean): void {
    state.isLogin = data
  }
}
