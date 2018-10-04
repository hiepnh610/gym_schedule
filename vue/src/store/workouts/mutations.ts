import { MutationTree } from 'vuex'
import { Workouts, WorkoutState } from './types'

export const mutations: MutationTree<WorkoutState> = {
  listWorkouts (state: any, data: Workouts): void {
    state.listWorkouts = data
  },

  deleteWorkout (state: any, id: string): void {
    for (var i = 0; i < state.listWorkouts.length; i++) {
      if (state.listWorkouts[i]._id === id) {
        state.listWorkouts.splice(i, 1)
      }
    }
  },

  createWorkout (state: any, data: Workouts): any {
    return state.listWorkouts.push(data)
  },

  updateWorkout (state: any, data: Workouts): any {
    for (var i = 0; i < state.listWorkouts.length; i++) {
      if (state.listWorkouts[i]._id === data._id) {
        state.listWorkouts[i].name = data.name
        state.listWorkouts[i].week_day = data.week_day
      }
    }
  }
}
