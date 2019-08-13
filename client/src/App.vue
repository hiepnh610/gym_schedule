<template>
  <div id="app" class="red-color">
    <navigation />

    <router-view />

    <div class="modal-backdrop fade show" v-if="showModalBackdrop"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import axios from 'axios'

import router from '@/router'
import config from '@/config'
import { Response } from '@/util'

import Navigation from '@/components/header/navigation.vue'

const namespaceAvatar: string = 'avatar'
const namespaceModal: string = 'modal'
const namespaceUser: string = 'user'
const namespaceAuth: string = 'auth'

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

  @Action('setToken', { namespace: namespaceAuth }) private setToken: any
  @Action('setVerified', { namespace: namespaceAuth }) private setVerified: any

  private message: string = ''

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
      if (error.response.status === 401 || error.response.status === 403) {
        $this.$session.destroy()
        router.push('/')
        $this.setAvatar('')
        this.setToken('')
      }

      return Promise.reject(error)
    })

    if ($this.$session.exists()) {
      this.setAuthenticate()
      this.getInfoUser()
    }

    this.toggleDropdown()
  }

  private setAuthenticate (): void {
    const $this: any = this
    this.setToken($this.$session.get('token'))
    this.setVerified($this.$session.get('verified'))
  }

  private getInfoUser (): void {
    axios
      .get(config.api.user)
      .then((response: Response): void => {
        if (response.data) { this.setUser(response.data) }

        if (response.data.avatar) { this.setAvatar(response.data.avatar) }
      })
      .catch((error: Response): void => {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
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
