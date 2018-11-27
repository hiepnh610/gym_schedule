export interface Note {
  _id: string;
  text: string;
}

export interface NoteState {
  listNotes: Array<Note>;
}
