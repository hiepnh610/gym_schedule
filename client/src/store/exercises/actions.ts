import { ActionTree } from 'vuex'
import { Exercises, ExerciseState } from './types'
import { RootState } from '@/types'

export const actions: ActionTree<ExerciseState, RootState> = {
  setListExercises (context: any, data: Exercises): any {
    context.commit('listExercises', data)
  },

  setDeleteExercise (context: any, data: string): string {
    return context.commit('deleteExercise', data)
  },

  setCreateExercise (context: any, data: Exercises): any {
    context.commit('createExercise', data)
  },

  setUpdateExercise (context: any, data: Exercises): any {
    context.commit('updateExercise', data)
  }
}
