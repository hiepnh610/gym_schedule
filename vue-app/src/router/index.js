import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/header/Login'
import SignUp from '@/components/header/SignUp'

import DashBoard from '@/components/Dashboard'

import AppPlan from '@/components/plan/AppPlan'

import AppWorkout from '@/components/workout/AppWorkout'

import AppExercise from '@/components/exercise/AppExercise'

import Settings from '@/components/Settings'

import AppProfile from '@/components/settings/AppProfile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      component: Login,
      name: 'Login',
      path: ''
    },
    {
      component: SignUp,
      name: 'SignUp',
      path: '/sign-up'
    },
    {
      component: DashBoard,
      name: 'DashBoard',
      path: '/dashboard',
      children: [
        {
          path: 'plan',
          name: 'AppPlan',
          component: AppPlan
        },
        {
          component: AppWorkout,
          name: 'AppWorkout',
          path: 'workout/:id',
          props: true
        },
        {
          component: AppExercise,
          name: 'AppExercise',
          path: 'exercise/:id',
          props: true
        }
      ]
    },
    {
      component: Settings,
      name: 'Settings',
      path: '/settings',
      children: [
        {
          path: 'profile',
          name: 'AppProfile',
          component: AppProfile
        }
      ]
    }
  ]
})
