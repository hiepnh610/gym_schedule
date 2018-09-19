interface listPlans {
  _id: string,
  frequency: number,
  name: string,
  type: string
}

interface listWorkouts {
  _id: string,
  name: string,
  weekDay: string
}

interface listExercise {
  history: string,
  image: string,
  name: string,
  sets: number,
  trackNote: string
}

interface State {
  showBackgroundModal: boolean,
  showCreateModal: boolean,
  showUpdateModal: boolean,
  listPlans?: Array<listPlans>,
  listWorkout?: Array<listWorkouts>,
  listExercise?: Array<listExercise>,
  avatar?: string
}

let state: State = {
  showBackgroundModal: false,
  showCreateModal: false,
  showUpdateModal: false
}

export default state
