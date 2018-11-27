import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { NoteState } from './types'
import { RootState } from '@/types'

export const state: NoteState = {
  listNotes: []
}

const namespaced: boolean = true

export const notes: Module<NoteState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
