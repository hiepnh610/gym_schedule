import Vue from 'vue'
import Router from 'vue-router'

import login from './views/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },

    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('./views/sign-up.vue')
    },

    {
      name: 'dashboard',
      path: '/dashboard',
      component: () => import('./views/dashboard.vue'),
      children: [
        {
          path: 'plan',
          name: 'main-plans',
          component: () => import('./views/plans.vue')
        },

        {
          name: 'main-workouts',
          path: 'workout/:id',
          props: true,
          component: () => import('./views/workouts.vue')
        },

        {
          name: 'main-exercises',
          path: 'exercise/:id',
          props: true,
          component: () => import('./views/exercises.vue')
        }
      ]
    },

    {
      name: 'settings',
      path: '/settings',
      component: () => import('./views/settings.vue'),
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: () => import('./components/settings/profile.vue')
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('./components/settings/account.vue')
        }
      ]
    }
  ]
})
