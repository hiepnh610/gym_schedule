import { MutationTree } from 'vuex'
import { Activity, ActivityState } from './types'

export const mutations: MutationTree<ActivityState> = {
  listActivities (state: any, data: Activity): void {
    state.listActivities = data
  },

  deleteActivity (state: any, id: string): void {
    for (var i = 0; i < state.listActivities.length; i++) {
      if (state.listActivities[i]._id === id) {
        state.listActivities.splice(i, 1)
      }
    }
  }
}
