// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'
import VeeValidate from 'vee-validate'

import router from './router'
import App from './components/App'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'animate.css/animate.min.css'

import '@/assets/scss/config.scss'
import '@/assets/scss/helper.scss'
import '@/assets/scss/modal.scss'

Vue.use(VueAxios, axios)
Vue.use(VeeValidate)
Vue.use(VueCookie)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
