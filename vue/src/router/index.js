import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/header/Login'
import SignUp from '@/components/header/SignUp'

import DashBoard from '@/components/Dashboard'

import AppPlan from '@/components/plan/AppPlan'

import AppWorkout from '@/components/workout/AppWorkout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/dashboard',
      name: 'DashBoard',
      component: DashBoard,
      children: [
        {
          path: 'plan',
          name: 'AppPlan',
          component: AppPlan
        },
        {
          path: 'workout/:id',
          name: 'AppWorkout',
          component: AppWorkout
        }
      ]
    }
  ]
})
