import { MutationTree } from 'vuex'
import { TrackLog, TrackLogState } from './types'

export const mutations: MutationTree<TrackLogState> = {
  listTrackLog (state: any, data: TrackLog): void {
    state.listTrackLog = data
  },

  deleteTrackLog (state: any, id: string): void {
    for (var i = 0; i < state.listTrackLog.length; i++) {
      if (state.listTrackLog[i]._id === id) {
        state.listTrackLog.splice(i, 1)
      }
    }
  },

  createTrackLog (state: any, data: TrackLog): any {
    return state.listTrackLog.push(data)
  }
}
