import { GetterTree } from 'vuex'
import { History, HistoryState } from './types'
import { RootState } from '@/types'

export const getters: GetterTree<HistoryState, RootState> = {
  listHistories (state: any): History {
    return state.listHistories
  }
}
