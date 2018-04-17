'use strict'

const domainAddress = 'http://localhost:3000'
const api = {
  sign_up: '/api/sign_up',
  login: '/api/login',
  listPlans: '/api/list_plans',
  plans: '/api/plans/',
  workout: '/api/workout_day/',
  listWorkout: '/api/list_workout'
}

module.exports = { api, domainAddress }
