import { ActionTree } from 'vuex'
import { History, HistoryState } from './types'
import { RootState } from '@/types'

export const actions: ActionTree<HistoryState, RootState> = {
  setListHistories (context: any, data: History): any {
    context.commit('listHistories', data)
  },

  setDeleteHistory (context: any, data: string): string {
    return context.commit('deleteHistory', data)
  },

  setCreateHistory (context: any, data: History): any {
    context.commit('createHistory', data)
  }
}
