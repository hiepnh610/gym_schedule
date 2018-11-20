import { ActionTree } from 'vuex'
import { ListExercisesType, CalendarState } from './types'
import { RootState } from '@/types'

export const actions: ActionTree<CalendarState, RootState> = {
  setCalendarTitle (context: any, data: string): any {
    return context.commit('calendarTitle', data)
  },

  setListExercises (context: any, data: ListExercisesType): any {
    return context.commit('listExercises', data)
  },

  setDeleteExercise (context: any, data: string): string {
    return context.commit('deleteExercise', data)
  }
}
