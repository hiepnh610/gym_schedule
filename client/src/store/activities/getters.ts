import { GetterTree } from 'vuex'
import { Activity, ActivityState } from './types'
import { RootState } from '@/types'

export const getters: GetterTree<ActivityState, RootState> = {
  listActivities (state: any): Activity {
    return state.listActivities
  }
}
