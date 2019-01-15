interface SetType {
  reps: number;
  weight: number;
}

interface Exercise {
  'exercise_id': string;
  'exercise_log': Array<SetType>;
  'exercise_image': string;
  'exercise_name': string;
  'exercise_note': string;
}

export interface Activity {
  'workout_name': string;
  exercises: Array<Exercise>;
  _id: string;
}

export interface ActivityState {
  listActivities: Array<Activity>;
}
