import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

import { RootState } from './types'
import { loginStatus } from './store/login/index'
import { user } from './store/user/index'
import { modal } from './store/modal/index'
import { plans } from './store/plans/index'
import { workouts } from './store/workouts/index'
import { exercises } from './store/exercises/index'
import { avatar } from './store/avatar/index'
import { calendar } from './store/calendar/index'
import { activities } from './store/activities/index'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0'
  },

  modules: {
    loginStatus,
    user,
    modal,
    plans,
    workouts,
    exercises,
    avatar,
    calendar,
    activities
  },

  strict: process.env.NODE_ENV !== 'production'
}

export default new Vuex.Store(store)

