import { MutationTree } from 'vuex'
import { Plans, PlanState } from './types'

export const mutations: MutationTree<PlanState> = {
  listPlans (state: any, data: Plans): void {
    state.listPlans = data
  },

  deletePlan (state: any, id: string): void {
    let index: number = 0

    for (const plan of state.listPlans) {
      if (plan._id === id) {
        state.listPlans.splice(index, 1)
      }

      index++
    }
  },

  createPlan (state: any, data: Plans): any {
    return state.listPlans.push(data)
  },

  updatePlan (state: any, data: Plans): any {
    for (const plan of state.listPlans) {
      if (plan._id === data._id) {
        plan.name = data.name
        plan.type = data.type
        plan.frequency = data.frequency
      }
    }
  }
}
