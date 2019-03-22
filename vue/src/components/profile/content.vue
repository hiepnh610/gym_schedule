<template>
  <section>
    <activities :full-name="fullName" :avatar="avatar" :isOwner="isOwner" />
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

import Activities from './activities.vue'

@Component({
  components: {
  Activities
  }
  })
export default class ProfileContent extends Vue {
  @Prop() private fullName!: string
  @Prop() private avatar!: string
  @Prop() private isOwner!: boolean
}
</script>
