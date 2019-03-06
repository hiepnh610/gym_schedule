import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import Toasted from 'vue-toasted'
import VueAxios from 'vue-axios'
import VueSession from 'vue-session'
import VueTextareaAutosize from 'vue-textarea-autosize'

import App from './App.vue'
import router from './router'
import store from './store'

import './registerServiceWorker'

import { library } from '@fortawesome/fontawesome-svg-core'
import iconFont from '@/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import '@/filter'

import 'bootstrap/dist/css/bootstrap.min.css'
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
Vue.use(VueSession, { persist: true })
Vue.use(Toasted, fontawesomeOptions)
Vue.use(VueTextareaAutosize)

Vue.prototype.moment = moment

library.add(iconFont.fas, iconFont.far)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
