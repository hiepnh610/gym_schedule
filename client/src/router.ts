import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Login from './views/login.vue'

Vue.use(Router)

const router = new Router({
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
      redirect: { name: 'TimelineProfile' },
      meta: { requiresAuth: true },
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
      meta: { requiresAuth: true },
      component: () => import('./views/news-feed.vue')
    },

    {
      path: '/plans',
      name: 'Plans',
      meta: { requiresAuth: true },
      component: () => import('./views/plans.vue')
    },

    {
      path: '/workouts/:id',
      name: 'Workouts',
      props: true,
      meta: { requiresAuth: true },
      component: () => import('./views/workouts.vue')
    },

    {
      path: '/exercises/:id',
      name: 'Exercises',
      props: true,
      meta: { requiresAuth: true },
      component: () => import('./views/exercises.vue')
    },

    {
      path: '/calendar',
      name: 'Calendar',
      redirect: { name: 'AllCalendar' },
      meta: { requiresAuth: true },
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
      path: '/settings',
      name: 'Settings',
      redirect: { name: 'SettingProfile' },
      meta: { requiresAuth: true },
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
      meta: { requiresAuth: true },
      component: () => import('./views/messages.vue')
    },

    {
      path: '/confirm-verification/:token',
      name: 'ConfirmVerification',
      meta: { requiresAuth: true },
      component: () => import('./views/confirmVerification.vue')
    },

    {
      path: '/reset-password/:token',
      name: 'ResetPassword',
      component: () => import('./components/password/resetPassword.vue')
    },

    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: () => import('./components/password/forgotPassword.vue')
    },

    {
      path: '*',
      meta: { notFound: true },
      component: () => import('./views/not-found.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const session: any = localStorage.getItem('vue-session-key')
  const sessionParse: any = JSON.parse(session)
  const state: any = store.state
  const token: string = state.auth.token

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (sessionParse.token || token) {
      next()
    } else {
      next({
        name: 'Login',
        params: { nextUrl: to.fullPath }
      })
    }
  } else if (to.matched.some((record) => record.meta.notFound)) {
    next()
  } else {
    if ((sessionParse && sessionParse.token) || token) {
      next({ name: 'NewsFeed' })
    } else {
      next()
    }
  }
})

export default router
