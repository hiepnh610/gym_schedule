import { MutationTree } from 'vuex'
import { Activity, ActivityState } from './types'

export const mutations: MutationTree<ActivityState> = {
  listActivities (state: any, data: Activity): void {
    state.listActivities = data
  },

  deleteActivity (state: any, id: string): void {
    for (const keyActivity in state.listActivities) {
      if (state.listActivities.hasOwnProperty(keyActivity)) {
        if (state.listActivities[keyActivity]._id === id) {
          state.listActivities.splice(keyActivity, 1)
        }

        // This loop for find id of activity
        // Because the data of profile activities has different structure
        for (const activity in state.listActivities[keyActivity]) {
          if (state.listActivities.hasOwnProperty(keyActivity)) {
            if (state.listActivities[keyActivity][activity]._id === id) {
              state.listActivities[keyActivity].splice(activity, 1)
            }
          }
        }
      }
    }
  },

  likeActivity (state: any, id: string): void {
    for (const keyActivity in state.listActivities) {
      if (state.listActivities.hasOwnProperty(keyActivity)) {
        for (const activity of state.listActivities[keyActivity]) {
          if (activity._id === id) {
            activity.like.status = true
            activity.like.quantity = activity.like.quantity + 1
          }
        }
      }
    }
  },

  unlikeActivity (state: any, id: string): void {
    for (const keyActivity in state.listActivities) {
      if (state.listActivities.hasOwnProperty(keyActivity)) {
        for (const activity of state.listActivities[keyActivity]) {
          if (activity._id === id) {
            activity.like.status = false

            if (activity.like.quantity > 0) {
              activity.like.quantity = activity.like.quantity - 1
            }
          }
        }
      }
    }
  },

  addComment (state: any, data: any): void {
    for (const keyActivity in state.listActivities) {
      if (state.listActivities.hasOwnProperty(keyActivity)) {
        for (const activity of state.listActivities[keyActivity]) {
          if (activity._id === data.activity_id) {
            activity.comments.push(data)
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
  },

  updateComment (state: any, data: any): void {
    for (const keyActivity in state.listActivities) {
      if (state.listActivities.hasOwnProperty(keyActivity)) {
        for (const activity of state.listActivities[keyActivity]) {
          for (const comment of activity.comments) {
            if (comment._id === data._id) {
              comment.body = data.body
              comment.edited = data.edited
              comment.updatedAt = data.updatedAt
            }
          }
        }
      }
    }
  },

  likeComment (state: any, id: string): void {
    for (const keyActivity in state.listActivities) {
      if (state.listActivities.hasOwnProperty(keyActivity)) {
        for (const activity of state.listActivities[keyActivity]) {
          if (activity.comments) {
            for (const comment of activity.comments) {
              if (comment._id === id) {
                comment.like.status = true
              }
            }
          }
        }
      }
    }
  },

  unlikeComment (state: any, id: string): void {
    for (const keyActivity in state.listActivities) {
      if (state.listActivities.hasOwnProperty(keyActivity)) {
        for (const activity of state.listActivities[keyActivity]) {
          if (activity.comments) {
            for (const comment of activity.comments) {
              if (comment._id === id) {
                comment.like.status = false
              }
            }
          }
        }
      }
    }
  }
}
