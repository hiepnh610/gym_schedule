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

interface CommentType {
  'full_name': string
  _id: string
  avatar?: string
  body: string
  like: object
  username: string
}

export interface Activity {
  'workout_name': string
  _id: string
  created_at: string
  created_by: string
  exercises: Exercise[]
  like: object
  updatedAt: string
  comment: CommentType[]
  edited: boolean
}

export interface ActivityState {
  listActivities: Activity[]
}
