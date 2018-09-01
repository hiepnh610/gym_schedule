import Vue from 'vue'
import axios from 'axios'
import Toasted from 'vue-toasted'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'
import VueSession from 'vue-session'
import VeeValidate from 'vee-validate'

import App from './App.vue'
import router from './router'
import store from './store'

import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import { faSpinner } from '@fortawesome/fontawesome-free-solid'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css/animate.min.css'

import '@/assets/scss/config.scss'
import '@/assets/scss/modal.scss'
import '@/assets/scss/form.scss'
import '@/assets/scss/table.scss'
import '@/assets/scss/button.scss'

const Options = {
  duration: 5000,
  iconPack: 'fontawesome',
  position: 'top-right',
  theme: 'primary'
}

Vue.use(VueAxios, axios)
Vue.use(VeeValidate)
Vue.use(VueCookie)
Vue.use(VueSession, { persist: true })
Vue.use(Toasted, Options)
Vue.config.productionTip = false

fontawesome.library.add(brands, faSpinner)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
