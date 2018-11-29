interface apiTypes {
  avatar: string;
  listPlans: string;
  listWorkout: string;
  listExercise: string;
  login: string;
  modifyPassword: string;
  plans: string;
  signUp: string;
  upload: string;
  user: string;
  workout: string;
  exercise: string;
  history: string;
  trackLog: string;
  note: string;
  calendar: string;
  calendarDetail: string;
}

const domainAddress: any = process.env.VUE_APP_DOMAIN

const api: apiTypes = {
  avatar: `${domainAddress}/api/avatar/`,
  listPlans: `${domainAddress}/api/list_plans`,
  listWorkout: `${domainAddress}/api/list_workout`,
  listExercise: `${domainAddress}/api/list_exercise`,
  login: `${domainAddress}/api/login`,
  modifyPassword: `${domainAddress}/api/modify_password/`,
  plans: `${domainAddress}/api/plans/`,
  signUp: `${domainAddress}/api/sign_up`,
  upload: `${domainAddress}/api/upload`,
  user: `${domainAddress}/api/user/`,
  workout: `${domainAddress}/api/workout/`,
  exercise: `${domainAddress}/api/exercise/`,
  history: `${domainAddress}/api/exercise/history/`,
  trackLog: `${domainAddress}/api/exercise/track_log/`,
  note: `${domainAddress}/api/exercise/note/`,
  calendar: `${domainAddress}/api/exercise/calendar/`,
  calendarDetail: `${domainAddress}/api/exercise/calendar_detail/`
}

export default { api }
