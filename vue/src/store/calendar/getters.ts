import { GetterTree } from 'vuex'
import { CalendarState } from './types'
import { RootState } from '@/types'

export const getters: GetterTree<CalendarState, RootState> = {
  calendarTitle (state: any): string {
    return state.calendarTitle
  }
}
