<template>
  <div v-show="isOpenCommentBox">
    <hr class="m-0" />

    <div class="comments p-3 d-flex">
      <div class="avatar mr-3">
        <img :src="avatar" alt="" v-if="avatar" />

        <img src="@/assets/images/avatar-default.png" alt="" v-else />
      </div>

      <textarea-autosize
      class="form-control"
      rows="1"
      :min-height="40"
      :max-height="300"
      ref="comment" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

const namespaceAvatar: string = 'avatar'

@Component({})
export default class ActivitiesComments extends Vue {
  @Prop() private isOpenCommentBox!: boolean

  @Getter('avatar', { namespace: namespaceAvatar }) private avatar: any
}
</script>
