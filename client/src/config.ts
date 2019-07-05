interface ApiTypes {
  activities: string
  activityDetail: string
  avatar: string
  comment: string
  email: string
  exercise: string
  follow: string
  forgotPassword: string
  images: string
  likeActivity: string
  listExercise: string
  listPlans: string
  listWorkout: string
  login: string
  modifyPassword: string
  plans: string
  profile: string
  profileActivities: string
  profileImages: string
  resendVerificationMail: string
  resetPassword: string
  signUp: string
  unFollow: string
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
  follow: '/api/follow/',
  forgotPassword: '/api/forgot-password',
  images: '/api/images',
  likeActivity: '/api/like/',
  listExercise: '/api/list_exercise',
  listPlans: '/api/list_plans',
  listWorkout: '/api/list_workout',
  login: '/api/login',
  modifyPassword: '/api/modify_password/',
  plans: '/api/plans/',
  profile: '/api/profile/',
  profileActivities: '/api/profile_activities/',
  profileImages: '/api/profile-images',
  resendVerificationMail: '/api/resend-verification-mail',
  resetPassword: '/api/reset-password',
  signUp: '/api/sign_up',
  unFollow: '/api/un-follow/',
  upload: '/api/upload',
  user: '/api/user/',
  workout: '/api/workout/'
}

export default { api }
