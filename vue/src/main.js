// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Toasted from 'vue-toasted';
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'
import VueSession from 'vue-session'
import VeeValidate from 'vee-validate'

import router from './router'
import App from './components/App'
import store from '@/store/index'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'animate.css/animate.min.css'

import '@/assets/scss/config.scss'
import '@/assets/scss/helper.scss'
import '@/assets/scss/modal.scss'
import '@/assets/scss/form.scss'
import '@/assets/scss/table.scss'

const Options = {
    duration: 2000,
    iconPack: 'fontawesome',
    position: 'top-right',
    theme: 'primary'
}

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VeeValidate)
Vue.use(VueCookie)
Vue.use(VueSession, { persist: true })
Vue.use(Toasted, Options)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: { App }
})
