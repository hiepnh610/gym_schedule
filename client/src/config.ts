interface ApiTypes {
  activities: string
  activityDetail: string
  avatar: string
  comment: string
  email: string
  exercise: string
  forgotPassword: string
  likeActivity: string
  listExercise: string
  listPlans: string
  listWorkout: string
  login: string
  modifyPassword: string
  plans: string
  profile: string
  profileActivities: string
  resendVerificationMail: string
  resetPassword: string
  signUp: string
  upload: string
  user: string
  workout: string
}

const api: ApiTypes = {
  activities: '/api/activities/',
  activityDetail: '/api/activity_detail',
  avatar: '/api/avatar/',
  comment: '/api/comment/',
  email: '/api/email-verification',
  exercise: '/api/exercise/',
  forgotPassword: '/api/forgot-password',
  likeActivity: '/api/like/',
  listExercise: '/api/list_exercise',
  listPlans: '/api/list_plans',
  listWorkout: '/api/list_workout',
  login: '/api/login',
  modifyPassword: '/api/modify_password/',
  plans: '/api/plans/',
  profile: '/api/profile/',
  profileActivities: '/api/profile_activities/',
  resendVerificationMail: '/api/resend-verification-mail',
  resetPassword: '/api/reset-password',
  signUp: '/api/sign_up',
  upload: '/api/upload',
  user: '/api/user/',
  workout: '/api/workout/'
}

export default { api }
