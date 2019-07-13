<template>
  <div id="settings" class="container">
    <div class="row">
      <div class="col-3">
        <sidebar></sidebar>
      </div>

      <div class="col-12 col-md-9">
        <div class="row">
          <div class="col-12 col-md-8">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import sidebar from '@/components/settings/sidebar.vue'

@Component({
  components: {
  sidebar
  }
  })
export default class Settings extends Vue {
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/_settings.scss";
</style>
