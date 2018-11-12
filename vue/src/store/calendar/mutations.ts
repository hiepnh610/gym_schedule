import { MutationTree } from 'vuex'
import { CalendarState } from './types'

export const mutations: MutationTree<CalendarState> = {
  calendarTitle (state: any, data: string): void {
    state.calendarTitle = data
  }
}
