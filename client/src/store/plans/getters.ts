import { GetterTree } from 'vuex'
import { Plans, PlanState } from './types'
import { RootState } from '@/types'

export const getters: GetterTree<PlanState, RootState> = {
  listPlans (state: any): Plans {
    return state.listPlans
  }
}
