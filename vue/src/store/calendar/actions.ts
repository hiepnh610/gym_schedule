import { ActionTree } from 'vuex'
import { CalendarState } from './types'
import { RootState } from '@/types'

export const actions: ActionTree<CalendarState, RootState> = {
  setCalendarTitle (context: any, data: string): any {
    return context.commit('calendarTitle', data)
  }
}
