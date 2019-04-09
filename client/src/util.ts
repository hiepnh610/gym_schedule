export interface Response {
  [propName: string]: any
}

export interface ID {
  id: string
}

export interface ExerciseType {
  'exercise_id': string
  'exercise_image': string
  'exercise_log': ExerciseLogType[]
  'exercise_name': string
  _id: string
}

export interface ExerciseLogType {
  _id: string
  reps: number
  weight: number
}

export interface CommentType {
  'full_name': string
  avatar: string
  body: string
  username: string
  _id: string
}

export interface ActivityType {
  'workout_name': string
  _id: string
  comments: CommentType[]
  created_at: string
  created_by: string
  like: object
  updatedAt: string
}

export interface ParamEmailVerification {
  token: string
}

export interface ParamForgotPassword {
  email: string
}

export interface ParamResetPassword {
  confirmPassword: string
  password: string
  token: string
}

export function setLoading (self: any, state: boolean): any {
  setTimeout((): any => {
    self.isLoading = state
  }, 500)
}
