import { MutationTree } from 'vuex'
import { History, HistoryState } from './types'

export const mutations: MutationTree<HistoryState> = {
  listHistories (state: any, data: History): void {
    state.listHistories = data
  },

  deleteHistory (state: any, id: string): void {
    for (var i = 0; i < state.listHistories.length; i++) {
      if (state.listHistories[i]._id === id) {
        state.listHistories.splice(i, 1)
      }
    }
  },

  createHistory (state: any, data: History): any {
    return state.listHistories.push(data)
  }
}
