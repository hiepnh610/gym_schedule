export interface Exercises {
  _id: string;
  history: string;
  image: string;
  name: string;
  sets: any;
  track_note: string;
  workout_id: string;
}

export interface ExerciseState {
  listExercises: Array<Exercises>;
}
