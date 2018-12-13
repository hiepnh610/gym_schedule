<template>
  <div class="activities-list">
    <div class="activity">
      <header class="px-3 pt-3 pb-2">
        <div class="avatar d-inline-block mr-3 align-top">
          <img :src="avatar" alt="" v-if="avatar" />

          <img src="@/assets/images/avatar-default.png" alt="" v-else />
        </div>

        <p class="d-inline-block mb-0">
          <strong class="d-block text-primary">Nguyen Hoang Hiep</strong>

          <small class="text-muted">December 11, 2018 at 7:30 PM</small>
        </p>

        <font-awesome-icon icon="ellipsis-h" class="text-muted more-options" />
      </header>

      <hr class="m-0" />

      <section class="px-3 py-2">
        <strong>Push 1</strong>

        <p class="mb-0">Dumbell, Bench Press, Leg Press ...</p>
      </section>

      <hr class="m-0" />

      <footer>
        <div class="profile-like d-inline-block py-2 px-3 border-right">
          <font-awesome-icon :icon="['far', 'heart']" class="text-muted" />
        </div>

        <div class="profile-comment d-inline-block py-2 px-3 border-right">
          <font-awesome-icon :icon="['far', 'comment-alt']" class="text-muted" />
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const namespaceAvatar: string = 'avatar'

@Component({
  components: {
  FontAwesomeIcon
  }
  })
export default class ProfileActivities extends Vue {
  @Getter('avatar', { namespace: namespaceAvatar }) avatar: any
}
</script>
