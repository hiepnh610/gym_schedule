export interface Plans {
  _id: string
  frequency: string
  name: string
  type: string
}

export interface PlanState {
  listPlans: Plans[]
}
