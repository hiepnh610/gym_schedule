interface SetsType {
  _id: String;
  weight: Number;
  reps: Number;
}

export interface ListExercisesType {
  text: String;
  name: String;
  image: String;
  _id: String;
  sets: Array<SetsType>;
}

export interface CalendarState {
  calendarTitle: String;
  listExercises: Array<ListExercisesType>;
}
