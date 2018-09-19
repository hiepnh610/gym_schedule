<template>
  <div id="app">
    <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere qui adipisci quasi totam laudantium. Possimus, saepe? Voluptate quas sequi, dignissimos, enim voluptas voluptates molestiae, placeat quaerat quibusdam architecto quo eligendi?</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import axios from 'axios'
import config from '@/config'

@Component
export default class App extends Vue {
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

  get showBackgroundModal () {
    return this.$store.getters.showBackgroundModal
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
