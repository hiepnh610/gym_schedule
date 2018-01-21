<template>
  <div id="app">
    <app-nav></app-nav>

    <router-view></router-view>
  </div>
</template>

<script>
import AppNav from './AppNav.vue'
export default {
  name: 'App',
  components: { AppNav },
  beforeCreate () {
    const isSession = this.$session.exists()
    const urlPath = this.$route.path

    if ((isSession && urlPath === '/sign-up') || (isSession && urlPath === '/login')) {
      this.$router.push('dashboard')
    }

    if (!isSession && urlPath === '/dashboard') {
      this.$router.push('sign-up')
    }
  }
}
</script>

<style lang="scss"></style>