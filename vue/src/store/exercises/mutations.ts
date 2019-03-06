import { MutationTree } from 'vuex'
import { Exercises, ExerciseState } from './types'

export const mutations: MutationTree<ExerciseState> = {
  listExercises (state: any, data: Exercises): void {
    state.listExercises = data
  },

  deleteExercise (state: any, id: string): void {
    let index: number = 0

    for (const exercise of state.listExercises) {
      if (exercise._id === id) {
        state.listExercises.splice(index, 1)
      }

      index++
    }
  },

  createExercise (state: any, data: Exercises): any {
    return state.listExercises.push(data)
  },

  updateExercise (state: any, data: Exercises): any {
    for (const exercise of state.listExercises) {
      if (exercise._id === data._id) {
        exercise.image = data.image
        exercise.name = data.name
        exercise.workout_id = data.workout_id
      }
    }
  }
}
