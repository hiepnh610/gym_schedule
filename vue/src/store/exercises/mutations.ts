import { MutationTree } from 'vuex'
import { Exercises, ExerciseState } from './types'

export const mutations: MutationTree<ExerciseState> = {
  listExercises (state: any, data: Exercises): void {
    state.listExercises = data
  },

  deleteExercise (state: any, id: string): void {
    for (var i = 0; i < state.listExercises.length; i++) {
      if (state.listExercises[i]._id === id) {
        state.listExercises.splice(i, 1)
      }
    }
  },

  createExercise (state: any, data: Exercises): any {
    return state.listExercises.push(data)
  },

  updateExercise (state: any, data: Exercises): any {
    for (var i = 0; i < state.listExercises.length; i++) {
      if (state.listExercises[i]._id === data._id) {
        state.listExercises[i].history = data.history
        state.listExercises[i].image = data.image
        state.listExercises[i].name = data.name
        state.listExercises[i].sets = data.sets
        state.listExercises[i].track_note = data.track_note
        state.listExercises[i].workout_id = data.workout_id
      }
    }
  }
}
