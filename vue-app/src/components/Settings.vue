<template>
  <div id="settings" class="container">
    <div class="row">
      <div class="col-3">
        <app-sidebar></app-sidebar>
      </div>

      <div class="col-12 col-md-6">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import AppSidebar from './settings/AppSidebar.vue'

export default {
  name: 'Settings',

  components: { AppSidebar },

  created () {
    const isAuthenticated = this.$session.exists()
    const routePath = this.$route.path

    if (isAuthenticated) {
      if (routePath === '/settings') {
        this.$router.push('/settings/profile')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';
@import '../assets/scss/mixins.scss';

#settings {
  padding-top: $size-base * 8;
}
</style>
