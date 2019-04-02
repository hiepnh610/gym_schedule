import { ActionTree } from 'vuex'
import { LoginState } from './types'
import { RootState } from '@/types'

export const actions: ActionTree<LoginState, RootState> = {
  setLoginStatus (context: any, data: boolean): any {
    return context.commit('loginStatus', data)
  }
}

