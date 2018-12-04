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
    for (var i = 0; i < state.listExercises.length; i++) {
      if (state.listExercises[i]._id === id) {
        state.listExercises.splice(i, 1)
      }
    }
  },

  updateExercise (state: any, data: any): void {
    for (var i = 0; i < state.listExercises.length; i++) {
      if (state.listExercises[i]._id === data._id) {
        state.listExercises[i]['track_log'] = data['track_log']
        state.listExercises[i]['note'] = data['note']
      }
    }
  }
}
