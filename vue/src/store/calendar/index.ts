import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { CalendarState } from './types'
import { RootState } from '@/types'

export const state: CalendarState = {
  calendarTitle: ''
}

const namespaced: boolean = true

export const calendar: Module<CalendarState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
