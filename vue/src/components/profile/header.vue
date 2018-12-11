<template>
  <header>
    <div class="avatar">
      <img :src="avatar" alt="">
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
