<template>
  <div id="app">
    <app-nav></app-nav>

    <router-view></router-view>

    <div class="modal-backdrop fade show" v-if="showBackgroundModal"></div>
  </div>
</template>

<script>
import AppNav from './header/AppNav.vue'

export default {
  name: 'App',

  components: { AppNav },

  beforeCreate () {
    const isAuthenticated = this.$session.exists()
    const routePath = this.$route.path

    if ((isAuthenticated && routePath === '/sign-up') || (isAuthenticated && routePath === '/')) {
      this.$router.push('/dashboard')
    }

    if (!isAuthenticated && routePath !== '/') {
      this.$router.push('/sign-up')
    }
  },

  computed: {
    showBackgroundModal () {
      return this.$store.getters.showBackgroundModal
    }
  }
}
</script>

<style lang="scss"></style>