export interface Exercises {
  _id: string;
  history: string;
  image: string;
  name: string;
  track_note: string;
  workout_id: string;
  status: string;
}

export interface ExerciseState {
  listExercises: Array<Exercises>;
}
