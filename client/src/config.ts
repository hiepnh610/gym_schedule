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
  listFollower: string
  listPlans: string
  listWorkout: string
  login: string
  message: string
  modifyPassword: string
  newsFeed: string
  plans: string
  profile: string
  profileActivities: string
  profileImages: string
  resendVerificationMail: string
  resetPassword: string
  room: string
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
  listFollower: '/api/list-follower',
  listPlans: '/api/list_plans',
  listWorkout: '/api/list_workout',
  login: '/api/login',
  message: '/api/message',
  modifyPassword: '/api/modify_password/',
  newsFeed: '/api/news-feed/',
  plans: '/api/plans/',
  profile: '/api/profile/',
  profileActivities: '/api/profile_activities/',
  profileImages: '/api/profile-images',
  resendVerificationMail: '/api/resend-verification-mail',
  resetPassword: '/api/reset-password',
  room: '/api/room/',
  signUp: '/api/sign_up',
  unFollow: '/api/un-follow/',
  upload: '/api/upload',
  user: '/api/user/',
  workout: '/api/workout/'
}

export default { api }
