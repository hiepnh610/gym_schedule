import { ActionTree } from 'vuex'
import { TrackLog, TrackLogState } from './types'
import { RootState } from '@/types'

export const actions: ActionTree<TrackLogState, RootState> = {
  setListTrackLog (context: any, data: TrackLog): any {
    context.commit('listTrackLog', data)
  },

  setDeleteTrackLog (context: any, data: string): string {
    return context.commit('deleteTrackLog', data)
  },

  setCreateTrackLog (context: any, data: TrackLog): any {
    context.commit('createTrackLog', data)
  }
}
