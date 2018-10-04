<template>
  <div id="app">
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

const namespace: string = 'modal'

@Component({
  components: {
  Navigation,
  },
  })
export default class App extends Vue {
  @Getter('showModalBackdrop', { namespace }) showModalBackdrop: any

  beforeCreate () {
    const _this: any = this
    const isAuthenticated: boolean = _this.$session.exists()
    const routePath: string = this.$route.path

    if (isAuthenticated) {
      if (routePath === '/sign-up' || routePath === '/') this.$router.push('/dashboard')

      if (routePath === '/settings') this.$router.push('/settings/profile')
    } else {
      if (routePath !== '/') this.$router.push('/sign-up')
    }
  }

  created () {
    const _this: any = this

    if (_this.$session.exists()) {
      axios
        .get(config.domainAddress + config.api.user, {
          params: {
            id: _this.$session.get('id')
          }
        })
        .then(function (response: Response) {
          if (response.data.avatar) {
            _this.$store.dispatch('setAvatar', response.data.avatar.location)
          }
        })
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

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';
  @import '@/assets/scss/mixins.scss';

  .loading {
    background: rgba($black, .7);
    bottom: 0;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 1;

    svg {
      color: $white;
      font-size: 4 * $size-base;
      left: 50%;
      position: absolute;
      top: 50%;
      @include translate(-50%, -50%);
    }
  }
</style>
