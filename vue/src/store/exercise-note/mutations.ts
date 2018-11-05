import { MutationTree } from 'vuex'
import { Note, NoteState } from './types'

export const mutations: MutationTree<NoteState> = {
  listNotes (state: any, data: Note): void {
    state.listNotes = data
  },

  deleteNote (state: any, id: string): void {
    for (var i = 0; i < state.listNotes.length; i++) {
      if (state.listNotes[i]._id === id) {
        state.listNotes.splice(i, 1)
      }
    }
  },

  createNote (state: any, data: Note): any {
    return state.listNotes.push(data)
  }
}
