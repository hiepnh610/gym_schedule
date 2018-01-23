import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/header/Login'
import SignUp from '@/components/header/SignUp'
import Dashboard from '@/components/Dashboard'

import AppPlan from '@/components/plan/AppPlan'
import AppPlanCreate from '@/components/plan/AppPlanCreate'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
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
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '/plan',
          component: AppPlan,
          children: [
            {
              path: '/create',
              component: AppPlanCreate
            }
          ]
        }
      ]
    }
  ]
})
