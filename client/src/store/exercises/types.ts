export interface Exercises {
  _id: string
  image: string
  name: string
  workout_id: string
}

export interface ExerciseState {
  listExercises: Exercises[]
}
