interface ApiTypes {
  avatar: string
  listPlans: string
  listWorkout: string
  listExercise: string
  login: string
  modifyPassword: string
  plans: string
  signUp: string
  upload: string
  user: string
  workout: string
  exercise: string
  profile: string
  profileActivities: string
  activities: string
  activityDetail: string
}

const api: ApiTypes = {
  avatar: '/api/avatar/',
  listPlans: '/api/list_plans',
  listWorkout: '/api/list_workout',
  listExercise: '/api/list_exercise',
  login: '/api/login',
  modifyPassword: '/api/modify_password/',
  plans: '/api/plans/',
  signUp: '/api/sign_up',
  upload: '/api/upload',
  user: '/api/user/',
  workout: '/api/workout/',
  exercise: '/api/exercise/',
  profile: '/api/profile/',
  profileActivities: '/api/profile_activities/',
  activities: '/api/activities/',
  activityDetail: '/api/activity_detail'
}

export default { api }
