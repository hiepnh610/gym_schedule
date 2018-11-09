import Vue from 'vue'
import axios from 'axios'
import Toasted from 'vue-toasted'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'
import VueSession from 'vue-session'
import VeeValidate from 'vee-validate'
import BootstrapVue from 'bootstrap-vue'
import VueTextareaAutosize from 'vue-textarea-autosize'

import App from './App.vue'
import router from './router'
import store from './store'

import './registerServiceWorker'

import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import { faSpinner } from '@fortawesome/fontawesome-free-solid'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'animate.css/animate.min.css'

import './assets/scss/style.scss'

interface Options {
  duration: number,
  iconPack: string,
  position: string,
  theme: string
}

const fontawesomeOptions: Options = {
  duration: 5000,
  iconPack: 'fontawesome',
  position: 'top-right',
  theme: 'primary'
}

Vue.use(VueAxios, axios)
Vue.use(VeeValidate)
Vue.use(VueCookie)
Vue.use(VueSession, { persist: true })
Vue.use(Toasted, fontawesomeOptions)
Vue.use(BootstrapVue)
Vue.use(VueTextareaAutosize)
Vue.config.productionTip = false

fontawesome.library.add(brands, faSpinner)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
