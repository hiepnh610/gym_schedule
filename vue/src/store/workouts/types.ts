export interface Workouts {
  _id: string;
  name: string;
  weekDay: string;
}

export interface WorkoutState {
  listWorkouts: Array<Workouts>;
}
