import { GetterTree } from 'vuex'
import { Exercises, ExerciseState } from './types'
import { RootState } from '@/types'

export const getters: GetterTree<ExerciseState, RootState> = {
  listExercises (state: any): Exercises {
    return state.listExercises
  }
}
