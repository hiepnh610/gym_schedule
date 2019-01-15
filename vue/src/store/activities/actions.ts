import { ActionTree } from 'vuex'
import { Activity, ActivityState } from './types'
import { RootState } from '@/types'

export const actions: ActionTree<ActivityState, RootState> = {
  setListActivities (context: any, data: Activity): any {
    context.commit('listActivities', data)
  },

  setDeleteActivity (context: any, data: string): string {
    return context.commit('deleteActivity', data)
  }
}
