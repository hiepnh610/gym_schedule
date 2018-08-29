<template>
  <div id="settings" class="container">
    <div class="row">
      <div class="col-3">
        <sidebar></sidebar>
      </div>

      <div class="col-12 col-md-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import sidebar from './settings/sidebar.vue'

  export default {
    name: 'settings',

    components: { sidebar },

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
