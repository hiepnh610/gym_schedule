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

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import sidebar from '@/components/settings/sidebar.vue'

@Component({
  components: {
  sidebar
  }
  })
export default class Settings extends Vue {
  private created () {
    const $this: any = this
    const isAuthenticated: boolean = $this.$session.exists()
    const routePath: string = this.$route.path

    if (isAuthenticated) {
      if (routePath === '/settings' || routePath === '/settings/') {
        this.$router.push('/settings/profile')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/_settings.scss";
</style>
