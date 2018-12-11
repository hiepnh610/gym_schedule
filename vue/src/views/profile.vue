<template>
  <div id="profile">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <profile-header />
        </div>

        <div class="col-12 col-md-4">
          <profile-sidebar />
        </div>

        <div class="col-12 col-md-8">
          <profile-content />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

import profileHeader from '@/components/profile/header.vue'
import profileSidebar from '@/components/profile/sidebar.vue'
import profileContent from '@/components/profile/content.vue'

@Component({
  components: {
  profileHeader,
  profileSidebar,
  profileContent,
  }
  })
export default class Profile extends Vue {}
</script>
