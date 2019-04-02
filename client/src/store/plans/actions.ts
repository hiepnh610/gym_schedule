import { ActionTree } from 'vuex'
import { Plans, PlanState } from './types'
import { RootState } from '@/types'

export const actions: ActionTree<PlanState, RootState> = {
  setListPlans (context: any, data: Plans): any {
    return context.commit('listPlans', data)
  },

  setDeletePlan (context: any, data: string): string {
    return context.commit('deletePlan', data)
  },

  setCreatePlan (context: any, data: Plans): any {
    return context.commit('createPlan', data)
  },

  setUpdatePlan (context: any, data: Plans): any {
    return context.commit('updatePlan', data)
  }
}
