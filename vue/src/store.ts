import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

import { RootState } from './types'
import { modal } from './store/modal/index'
import { plans } from './store/plans/index'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0'
  },

  modules: {
    modal,
    plans
  },

  strict: process.env.NODE_ENV !== 'production'
}

export default new Vuex.Store(store)
