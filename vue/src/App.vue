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

import config from '@/config'
import { Response } from '@/util'

import Navigation from '@/components/header/navigation.vue'

const namespaceAvatar: string = 'avatar'
const namespaceModal: string = 'modal'

@Component({
  components: {
  Navigation,
  },
  })
export default class App extends Vue {
  @Action('setAvatar', { namespace: namespaceAvatar }) setAvatar: any

  @Getter('showModalBackdrop', { namespace: namespaceModal }) showModalBackdrop: any

  created () {
    const _this: any = this

    this.setAuthenticate()
    this.getInfoUser()

    if (_this.$session.exists()) {
      const token: string = _this.$session.get('token')

      axios.defaults.headers.common['x-access-token'] = token
    }
  }

  setAuthenticate (): void {
    const _this: any = this
    const isAuthenticated: boolean = _this.$session.exists()
    const isOriginPage = window.location.href === (window.location.origin + '/')
    const isSignUpPage = window.location.href === (window.location.origin + '/sign-up')

    if (isAuthenticated) {
      if (isOriginPage || isSignUpPage) this.$router.push('/plans')
    } else {
      if (!isOriginPage) this.$router.push('/sign-up')
    }
  }

  getInfoUser (): void {
    const _this: any = this

    if (_this.$session.exists()) {
      axios
        .get(config.api.user, {
          params: {
            id: _this.$session.get('id')
          }
        })
        .then(function (response: Response) {
          if (response.data.avatar) this.setAvatar(response.data.avatar.location)
        }.bind(this))
        .catch(function (error: Response) {
          if (error.response && error.response.data && error.response.data.message) {
            _this.errContent = error.response.data.message
          } else {
            _this.errContent = 'Error happened.'
          }
        })
    }
  }
}
</script>
