import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

Vue.use(Vuex)

const store: StoreOptions = {
  modules: {},

  strict: process.env.NODE_ENV !== 'production'
}

export default new Vuex.Store(store)
