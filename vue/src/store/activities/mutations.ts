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
            key2.like.status = true
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
            key2.like.status = false
          }
        }
      }
    }
  },

  addComment (state: any, data: any): void {
    for (const key in state.listActivities) {
      if (state.listActivities.hasOwnProperty(key)) {
        for (const key2 of state.listActivities[key]) {
          if (key2._id === data.activity_id) {
            key2.comments.push(data)
          }
        }
      }
    }
  },

  deleteComment (state: any, id: string): void {
    for (const activityKey in state.listActivities) {
      if (state.listActivities.hasOwnProperty(activityKey)) {
        for (const activity of state.listActivities[activityKey]) {
          if (activity.comments.length) {
            for (const keyComment in activity.comments) {
              if (activity.comments[keyComment]._id === id) {
                activity.comments.splice(keyComment, 1)
              }
            }
          }
        }
      }
    }
  }
}
