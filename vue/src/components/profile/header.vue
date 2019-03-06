<template>
  <header class="profile-header">
    <div class="cover-photo">
      <div class="upload-cover-photo px-2 py-1">
        <font-awesome-icon icon="camera" class="text-muted mr-2" />

        <small>Update cover photo</small>
      </div>
    </div>

    <h2 class="profile-full-name">{{ userProfile.full_name }}</h2>

    <div class="btn-group" v-if="!isOwner">
      <div class="btn btn-sm btn-light mr-2">
        <font-awesome-icon icon="user-plus" class="mr-1" />
        Follow
      </div>

      <div class="btn btn-sm btn-light mr-2">
        <font-awesome-icon icon="comments" class="mr-1" />
        Messages
      </div>
    </div>

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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

interface TypeUser {
  address?: string
  avatar?: string
  bio?: string
  dob?: string
  'full_name'?: string
}

@Component({
  components: {
  FontAwesomeIcon
  }
  })
export default class ProfileHeader extends Vue {
  @Prop() private userProfile!: TypeUser
  @Prop() private isOwner!: boolean
}
</script>
