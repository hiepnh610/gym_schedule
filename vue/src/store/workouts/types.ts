interface TypeExercises {
  image: string;
  name: string;
}

export interface Workouts {
  _id: string;
  name: string;
  weekDay: string;
  planId: string;
  exercises: Array<TypeExercises>;
}

export interface WorkoutState {
  listWorkouts: Array<Workouts>;
}
