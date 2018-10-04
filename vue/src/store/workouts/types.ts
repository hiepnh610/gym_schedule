export interface Workouts {
  _id: string;
  name: string;
  week_day: string;
}

export interface WorkoutState {
  listWorkouts: Array<Workouts>;
}
