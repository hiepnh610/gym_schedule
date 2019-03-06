import { MutationTree } from 'vuex'
import { Workouts, WorkoutState } from './types'

export const mutations: MutationTree<WorkoutState> = {
  listWorkouts (state: any, data: any): void {
    state.listWorkouts = data.map((workout: any): any => {
      return {
        name: workout.name,
        planId: workout.plan_id,
        weekDay: workout.week_day,
        _id: workout._id,
        exercises: workout.exercises
      }
    })
  },

  deleteWorkout (state: any, id: string): void {
    let index: number = 0

    for (const workout of state.listWorkouts) {
      if (workout._id === id) {
        state.listWorkouts.splice(index, 1)
      }

      index++
    }
  },

  createWorkout (state: any, data: Workouts): any {
    return state.listWorkouts.push(data)
  },

  updateWorkout (state: any, data: any): any {
    for (const workout of state.listWorkouts) {
      if (workout._id === data._id) {
        workout.name = data.name
        workout.weekDay = data.weekDay
      }
    }
  }
}
