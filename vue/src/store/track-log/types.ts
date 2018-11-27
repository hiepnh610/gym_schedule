interface SetType {
  reps: Number;
  weight: Number;
}

export interface TrackLog {
  _id: String;
  track_log: Array<SetType>;
}

export interface TrackLogState {
  listTrackLog: Array<TrackLog>;
}
