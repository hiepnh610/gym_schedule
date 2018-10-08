import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },

    {
      path: '/sign-up',
      name: 'SignUp',
      component: () => import('./views/sign-up.vue')
    },

    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('./views/dashboard.vue'),
      children: [
        {
          path: 'plan',
          name: 'Plans',
          component: () => import('./views/plans.vue')
        },

        {
          path: 'workout/:id',
          name: 'Workouts',
          props: true,
          component: () => import('./views/workouts.vue')
        },

        {
          path: 'exercise/:id',
          name: 'Exercises',
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
