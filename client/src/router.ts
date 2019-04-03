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
      path: '/profile/:user',
      name: 'Profile',
      component: () => import('./views/profile.vue'),
      children: [
        {
          path: 'timeline',
          name: 'TimelineProfile',
          component: () => import('./components/profile/activities.vue')
        },

        {
          path: 'photos',
          name: 'PhotoProfile',
          component: () => import('./components/profile/photos.vue')
        },

        {
          path: 'calendar',
          name: 'CalendarProfile',
          component: () => import('./components/profile/calendar.vue')
        },

        {
          path: 'plans',
          name: 'PlansProfile',
          component: () => import('./components/profile/plans.vue')
        }
      ]
    },

    {
      path: '/news-feed',
      name: 'NewsFeed',
      component: () => import('./views/news-feed.vue')
    },

    {
      path: '/plans',
      name: 'Plans',
      component: () => import('./views/plans.vue')
    },

    {
      path: '/workouts/:id',
      name: 'Workouts',
      props: true,
      component: () => import('./views/workouts.vue')
    },

    {
      path: '/exercises/:id',
      name: 'Exercises',
      props: true,
      component: () => import('./views/exercises.vue')
    },

    {
      path: '/calendar',
      name: 'Calendar',
      component: () => import('./views/calendar.vue'),
      children: [
        {
          path: 'full',
          name: 'AllCalendar',
          component: () => import('./components/calendar/full-calendar.vue')
        },

        {
          path: 'detail/:date',
          name: 'CalendarDetail',
          props: true,
          component: () => import('./components/calendar/calendar-detail.vue')
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
          name: 'SettingProfile',
          component: () => import('./components/settings/profile.vue')
        },

        {
          path: 'account',
          name: 'account',
          component: () => import('./components/settings/account.vue')
        }
      ]
    },

    {
      path: '/messages',
      name: 'Messages',
      component: () => import('./views/messages.vue')
    },

    {
      path: '*',
      component: () => import('./views/not-found.vue')
    }
  ]
})
