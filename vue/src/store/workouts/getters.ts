import { GetterTree } from 'vuex'
import { Workouts, WorkoutState } from './types'
import { RootState } from '@/types'

export const getters: GetterTree<WorkoutState, RootState> = {
  listWorkout (state: any): Workouts {
    return state.listWorkouts
  }
}
