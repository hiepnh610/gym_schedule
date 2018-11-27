import { GetterTree } from 'vuex'
import { TrackLog, TrackLogState } from './types'
import { RootState } from '@/types'

export const getters: GetterTree<TrackLogState, RootState> = {
  listTrackLog (state: any): TrackLog {
    return state.listTrackLog
  }
}
