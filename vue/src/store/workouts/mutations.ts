import { MutationTree } from 'vuex'
import { Workouts, WorkoutState } from './types'

export const mutations: MutationTree<WorkoutState> = {
  listWorkouts (state: any, data: any): void {
    for (var i = 0; i < data.length; i++) {
      let newListWorkout: Workouts = {
        _id: data[i]._id,
        name: data[i].name,
        weekDay: data[i].week_day
      }

      state.listWorkouts.push(newListWorkout)
    }
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

  updateWorkout (state: any, data: any): any {
    for (var i = 0; i < state.listWorkouts.length; i++) {
      if (state.listWorkouts[i]._id === data._id) {
        state.listWorkouts[i].name = data.name
        state.listWorkouts[i].weekDay = data.week_day
      }
    }
  }
}
