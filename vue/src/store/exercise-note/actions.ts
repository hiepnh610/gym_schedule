import { ActionTree } from 'vuex'
import { Note, NoteState } from './types'
import { RootState } from '@/types'

export const actions: ActionTree<NoteState, RootState> = {
  setListNotes (context: any, data: Note): any {
    context.commit('listNotes', data)
  },

  setDeleteNote (context: any, data: string): string {
    return context.commit('deleteNote', data)
  },

  setCreateNote (context: any, data: Note): any {
    context.commit('createNote', data)
  },

  setUpdateNote (context: any, data: Note): any {
    context.commit('updateNote', data)
  }
}
