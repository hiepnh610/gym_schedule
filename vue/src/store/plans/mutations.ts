import { MutationTree } from 'vuex'
import { Plans, PlanState } from './types'

export const mutations: MutationTree<PlanState> = {
  listPlans (state: any, data: Plans): void {
    state.listPlans = data
  }
}
