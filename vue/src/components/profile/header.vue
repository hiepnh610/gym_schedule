<template>
  <header class="profile-header">
    <div class="cover-photo"></div>

    <h2 class="profile-full-name">{{ userProfile.full_name }}</h2>

    <nav class="nav">
      <a class="nav-link active" href="#">Timeline</a>

      <a class="nav-link" href="#">Photos</a>

      <a class="nav-link" href="#">Calendar</a>

      <a class="nav-link" href="#">Plans</a>
    </nav>

    <div class="avatar">
      <img :src="userProfile.avatar" alt="" v-if="userProfile && userProfile.avatar" />

      <img src="@/assets/images/avatar-default.png" alt="" v-else />
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

interface TypeUser {
  address?: string;
  avatar?: string;
  bio?: string;
  dob?: string;
  'full_name'?: string;
}

@Component
export default class ProfileHeader extends Vue {
  @Prop() userProfile!: TypeUser
}
</script>
