export interface Plans {
  frequency: string;
  name: string;
  type: string;
}

export interface PlanState {
  listPlans: Array<Plans>;
}
