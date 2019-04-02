import { MutationTree } from 'vuex'
import { CalendarState } from './types'

export const mutations: MutationTree<CalendarState> = {
  calendarTitle (state: any, data: string): void {
    state.calendarTitle = data
  },

  listExercises (state: any, data: any): void {
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

  updateExercise (state: any, data: any): void {
    for (const exercise of state.listExercises) {
      if (exercise._id === data._id) {
        exercise.track_log = data.track_log
        exercise.note = data.note
      }
    }
  }
}
