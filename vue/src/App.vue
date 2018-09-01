<template>
  <div id="app">
    <navigation></navigation>

    <router-view></router-view>

    <div class="modal-backdrop fade show" v-if="showBackgroundModal"></div>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from '@/config'
  import navigation from '@/components/header/navigation.vue'

  export default {
    name: 'App',

    components: { navigation },

    beforeCreate () {
      const isAuthenticated = this.$session.exists()
      const routePath = this.$route.path

      if (isAuthenticated) {
        if (routePath === '/sign-up' || routePath === '/') {
          this.$router.push('/dashboard')
        }

        if (routePath === '/settings') {
          this.$router.push('/settings/profile')
        }
      } else {
        if (routePath !== '/') {
          this.$router.push('/sign-up')
        }
      }
    },

    computed: {
      showBackgroundModal () {
        return this.$store.getters.showBackgroundModal
      }
    },

    created () {
      if (this.$session.exists()) {
        axios
          .get(config.domainAddress + config.api.user, {
            params: {
              id: this.$session.get('id')
            }
          })
          .then(function (response) {
            if (response.data.avatar) {
              this.$store.dispatch('setAvatar', response.data.avatar.location)
            }
          }.bind(this))
          .catch(function (error) {
            if (error.response && error.response.data && error.response.data.message) {
              this.errContent = error.response.data.message
            } else {
              this.errContent = 'Error happened.'
            }
          }.bind(this))
      }
    }
  }
</script>

<style lang="scss" scopled>
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
