import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

import { RootState } from './types'
import { modal } from './store/modal/index'
import { plans } from './store/plans/index'
import { workouts } from './store/workouts/index'
import { exercises } from './store/exercises/index'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0'
  },

  modules: {
    modal,
    plans,
    workouts,
    exercises
  },

  strict: process.env.NODE_ENV !== 'production'
}

export default new Vuex.Store(store)
