import { MutationTree } from 'vuex'
import { Activity, ActivityState } from './types'

export const mutations: MutationTree<ActivityState> = {
  listActivities (state: any, data: Activity): void {
    state.listActivities = data
  },

  deleteActivity (state: any, id: string): void {
    for (const key in state.listActivities) {
      if (state.listActivities.hasOwnProperty(key)) {
        if (state.listActivities[key]._id === id) {
          state.listActivities.splice(key, 1)
        }

        // This loop for find id of activity
        // Because the data of profile activities has different structure
        for (const key2 in state.listActivities[key]) {
          if (state.listActivities.hasOwnProperty(key)) {
            if (state.listActivities[key][key2]._id === id) {
              state.listActivities[key].splice(key2, 1)
            }
          }
        }
      }
    }
  },

  likeActivity (state: any, id: string): void {
    for (const key in state.listActivities) {
      if (state.listActivities.hasOwnProperty(key)) {
        for (const key2 of state.listActivities[key]) {
          if (key2._id === id) {
            key2.like = true
          }
        }
      }
    }
  },

  unlikeActivity (state: any, id: string): void {
    for (const key in state.listActivities) {
      if (state.listActivities.hasOwnProperty(key)) {
        for (const key2 of state.listActivities[key]) {
          if (key2._id === id) {
            key2.like = false
          }
        }
      }
    }
  }
}
