import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/header/login'
import signUp from '@/components/header/sign-up'

import dashboard from '@/components/dashboard'

import plans from '@/components/plan/main-plans'

import workouts from '@/components/workout/main-workouts'

import exercises from '@/components/exercise/main-exercises'

import settings from '@/components/settings'

import profile from '@/components/settings/profile'
import account from '@/components/settings/account'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      component: login,
      name: 'login',
      path: ''
    },
    {
      component: signUp,
      name: 'sign-up',
      path: '/sign-up'
    },
    {
      component: dashboard,
      name: 'dashboard',
      path: '/dashboard',
      children: [
        {
          path: 'plan',
          name: 'main-plans',
          component: plans
        },
        {
          component: workouts,
          name: 'main-workouts',
          path: 'workout/:id',
          props: true
        },
        {
          component: exercises,
          name: 'main-exercises',
          path: 'exercise/:id',
          props: true
        }
      ]
    },
    {
      component: settings,
      name: 'settings',
      path: '/settings',
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: profile
        },
        {
          path: 'account',
          name: 'account',
          component: account
        }
      ]
    }
  ]
})
