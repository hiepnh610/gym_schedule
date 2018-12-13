<template>
  <header class="profile-header">
    <div class="cover-photo"></div>

    <nav class="nav">
      <a class="nav-link active" href="#">Timeline</a>

      <a class="nav-link" href="#">Photos</a>

      <a class="nav-link" href="#">Calendar</a>

      <a class="nav-link" href="#">Plans</a>
    </nav>

    <div class="avatar">
      <router-link to="/settings/profile">
        <img :src="avatar" alt="" v-if="avatar" />

        <img src="@/assets/images/avatar-default.png" alt="" v-else />
      </router-link>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

const namespaceAvatar: string = 'avatar'

@Component
export default class ProfileHeader extends Vue {
  @Getter('avatar', { namespace: namespaceAvatar }) avatar: any
}
</script>
