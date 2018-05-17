<template>
  <div id="settings" class="container">
    <div class="row">
      <div class="col-3">
        <app-sidebar></app-sidebar>
      </div>

      <div class="col-12 col-md-9">
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

  &:before {
    background-image: url('../assets/images/settings-bg.jpg');
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    bottom: 0;
    content: '';
    height: 100%;
    left: 0;
    min-height: 100%;
    padding: $size-base * 4 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    z-index: -1;
  }

  &:after {
    background: rgba(#000, .1);
    bottom: 0;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    z-index: -1;
  }
}
</style>
