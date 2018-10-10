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
  },
  })
export default class Settings extends Vue {
  created () {
    const _this: any = this
    const isAuthenticated: boolean = _this.$session.exists()
    const routePath: string = this.$route.path

    if (isAuthenticated) {
      if (routePath === '/settings') {
        this.$router.push('/settings/profile')
      }
    }
  }
}
</script>
