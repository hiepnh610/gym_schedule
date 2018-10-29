export interface Exercises {
  _id: string;
  history: string;
  image: string;
  name: string;
  note: string;
  workout_id: string;
}

export interface ExerciseState {
  listExercises: Array<Exercises>;
}
