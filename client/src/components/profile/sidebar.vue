<template>
  <aside class="sidebar p-3">
    <div class="sidebar-intro">
      <header>
        <font-awesome-icon icon="globe-americas" class="mr-2 small text-muted fa-fw" />

        Intro
      </header>

      <p class="text-muted mb-0" v-if="userProfile.bio"><small>{{ userProfile.bio }}</small></p>
    </div>

    <hr class="my-2" v-if="userProfile.bio" />

    <div class="sidebar-information">
      <ul class="list-unstyled mb-0">
        <li v-if="userProfile.address">
          <font-awesome-icon icon="map-marker-alt" class="mr-2 small text-muted fa-fw" />

          <small>Lives in <span class="text-primary">{{ userProfile.address }}</span></small>
        </li>

        <li v-if="userProfile.dob">
          <font-awesome-icon icon="calendar-alt" class="mr-2 small text-muted fa-fw" />

          <small>{{ userProfile.dob | date_with_slash }}</small>
        </li>

        <li v-if="userProfile.follower.users.total">
          <font-awesome-icon icon="rss" class="mr-2 small text-muted fa-fw" />

          <small>Followed by <span class="text-primary">{{ userProfile.follower.users.total }} people</span></small>
        </li>
      </ul>
    </div>
  </aside>
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
export default class ProfileSidebar extends Vue {
  @Prop() private userProfile!: TypeUser
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/elements/profile/_sidebar.scss";
</style>
