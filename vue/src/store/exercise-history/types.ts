export interface History {
  _id: string;
  sets: string;
}

export interface HistoryState {
  listHistories: Array<History>;
}
