<template>
  <div id="app" class="red-color">
    <navigation />

    <router-view />

    <div class="modal-backdrop fade show" v-if="showModalBackdrop"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import axios from 'axios'

import router from '@/router'
import config from '@/config'
import { Response } from '@/util'

import Navigation from '@/components/header/navigation.vue'

const namespaceAvatar: string = 'avatar'
const namespaceModal: string = 'modal'
const namespaceUser: string = 'user'
const namespaceloginStatus: string = 'loginStatus'

@Component({
  components: {
  Navigation
  }
  })
export default class App extends Vue {
  @Action('setAvatar', { namespace: namespaceAvatar }) private setAvatar: any

  @Getter('showModalBackdrop', { namespace: namespaceModal }) private showModalBackdrop: any

  @Action('setUser', { namespace: namespaceUser }) private setUser: any
  @Getter('user', { namespace: namespaceUser }) private user: any

  @Action('setLoginStatus', { namespace: namespaceloginStatus }) private setLoginStatus: any

  private created () {
    const $this: any = this

    axios.defaults.baseURL = process.env.VUE_APP_DOMAIN

    axios.interceptors.request.use((conf) => {
      if ($this.$session.exists()) {
        conf.headers.common['x-access-token'] = $this.$session.get('token')
      }

      return conf
    }, (error) => {
      return Promise.reject(error)
    })

    axios.interceptors.response.use((response) => {
      return response
    }, (error) => {
      if (error.response.status === 401) {
        $this.$session.destroy()
        router.push('/')
        $this.setAvatar('')
        this.setLoginStatus(false)
      }

      return Promise.reject(error)
    })

    this.setAuthenticate()
    this.getInfoUser()
    this.toggleDropdown()
  }

  private setAuthenticate (): void {
    const $this: any = this
    const isAuthenticated: boolean = $this.$session.exists()
    const isOriginPage = window.location.href === (window.location.origin + '/')
    const isSignUpPage = window.location.href === (window.location.origin + '/sign-up')
    if (isAuthenticated) {
      if (isOriginPage || isSignUpPage) { this.$router.push('/plans') }
    } else {
      if (!isOriginPage) { this.$router.push('/sign-up') }
    }
  }

  private getInfoUser (): void {
    const $this: any = this

    axios
      .get(config.api.user)
      .then((response: Response): void => {
        this.setUser(response.data)

        if (response.data.avatar) { $this.setAvatar(response.data.avatar.location) }
      })
      .catch((error: Response): void => {
        if (error.response && error.response.data && error.response.data.message) {
          $this.errContent = error.response.data.message
        } else {
          $this.errContent = 'Error happened.'
        }
      })
  }

  private toggleDropdown (): void {
    const getDropDownToggle: any = document.getElementsByClassName('dropdown-toggle')

    window.addEventListener('click', (e) => {
      const target: any = e.target

      for (const dropdown of getDropDownToggle) {
        if (dropdown.contains(e.target)) {
          target.closest('.dropdown-toggle').classList.toggle('show')
        } else {
          dropdown.classList.remove('show')
        }
      }
    })
  }
}
</script>
