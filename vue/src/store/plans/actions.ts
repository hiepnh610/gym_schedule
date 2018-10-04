import { ActionTree } from 'vuex'
import { Plans, PlanState } from './types'
import { RootState } from '@/types'

export const actions: ActionTree<PlanState, RootState> = {
  setListPlans: (context: any, data: Plans) => {
    context.commit('listPlans', data)
  }
}
