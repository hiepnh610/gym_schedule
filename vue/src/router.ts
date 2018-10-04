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
      name: 'login',
      component: Login
    },

    {
      path: '/sign-up',
      name: 'signUp',
      component: () => import('./views/sign-up.vue')
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/dashboard.vue'),
      children: [
        {
          path: 'plan',
          name: 'mainPlans',
          component: () => import('./views/plans.vue')
        },

        // {
        //   path: 'workout/:id',
        //   name: 'mainWorkouts',
        //   props: true,
        //   component: () => import('./views/workouts.vue')
        // },

        // {
        //   path: 'exercise/:id',
        //   name: 'maiExercises',
        //   props: true,
        //   component: () => import('./views/exercises.vue')
        // }
      ]
    }
  ]
})
