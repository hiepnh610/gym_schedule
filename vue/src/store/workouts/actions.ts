import { ActionTree } from 'vuex'
import { Workouts, WorkoutState } from './types'
import { RootState } from '@/types'

export const actions: ActionTree<WorkoutState, RootState> = {
  setListWorkouts (context: any, data: any): any {
    context.commit('listWorkouts', data)
  },

  setDeleteWorkout (context: any, data: string): string {
    return context.commit('deleteWorkout', data)
  },

  setCreateWorkout (context: any, data: any): any {
    context.commit('createWorkout', data)
  },

  setUpdateWorkout (context: any, data: any): any {
    context.commit('updateWorkout', data)
  }
}
