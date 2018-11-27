import { GetterTree } from 'vuex'
import { Note, NoteState } from './types'
import { RootState } from '@/types'

export const getters: GetterTree<NoteState, RootState> = {
  listNotes (state: any): Note {
    return state.listNotes
  }
}
