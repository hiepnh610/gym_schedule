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
  _id: string
  created_at: string
  created_by: string
  exercises: Exercise[]
  like: boolean
  updatedAt: string
}

export interface ActivityState {
  listActivities: Activity[]
}
