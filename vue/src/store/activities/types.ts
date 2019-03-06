interface SetType {
  reps: number
  weight: number
}

interface Exercise {
  'exercise_id': string
  'exercise_log': SetType[]
  'exercise_image': string
  'exercise_name': string
  'exercise_note': string
}

export interface Activity {
  'workout_name': string
  exercises: Exercise[]
  _id: string
}

export interface ActivityState {
  listActivities: Activity[]
}
