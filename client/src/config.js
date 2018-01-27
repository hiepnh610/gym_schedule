'use strict'
const domainAddress = 'http://localhost:3000'
const api = {
  sign_up: '/api/sign_up',
  login: '/api/login',
  plans: '/api/plans',
  deletePlans: '/api/plans/{id}'
}

module.exports = { api, domainAddress }
