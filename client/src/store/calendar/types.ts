interface SetsType {
  _id: string
  weight: number
  reps: number
}

export interface ListExercisesType {
  text: string
  name: string
  image: string
  _id: string
  sets: SetsType[]
}

export interface CalendarState {
  calendarTitle: string
  listExercises: ListExercisesType[]
}
