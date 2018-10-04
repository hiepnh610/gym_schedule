import { MutationTree } from 'vuex'
import { Plans, PlanState } from './types'

export const mutations: MutationTree<PlanState> = {
  listPlans (state: any, data: Plans): void {
    state.listPlans = data
  },

  deletePlan (state: any, id: string): void {
    for (var i = 0; i < state.listPlans.length; i++) {
      if (state.listPlans[i]._id === id) {
        state.listPlans.splice(i, 1)
      }
    }
  },

  createPlan (state: any, data: Plans): any {
    return state.listPlans.push(data)
  },

  updatePlan (state: any, data: Plans): any {
    for (var i = 0; i < state.listPlans.length; i++) {
      if (state.listPlans[i]._id === data._id) {
        state.listPlans[i].name = data.name
        state.listPlans[i].type = data.type
        state.listPlans[i].frequency = data.frequency
      }
    }
  }
}
