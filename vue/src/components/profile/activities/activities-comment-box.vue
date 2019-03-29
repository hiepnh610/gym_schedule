<template>
  <div>
    <div class="comment-box p-2 d-none align-items-start" :class="{ 'd-flex': (isOpenCommentBox || activity.comments.length) && !editComment }">
      <div class="avatar mr-2">
        <img :src="avatar" alt="" v-if="avatar" />

        <img src="@/assets/images/avatar-default.png" alt="" v-else />
      </div>

      <textarea-autosize
      class="form-control"
      rows="1"
      :min-height="40"
      :max-height="300"
      ref="comment"
      v-model="bodyComment"
      @keydown.enter.native.exact.prevent
      @keyup.enter.native.exact="addComment(activity._id)"
      />
    </div>

    <div class="comment-box d-none" :class="{ 'd-block': editComment && openEditCommentBox }">
      <textarea-autosize
      class="form-control"
      rows="1"
      :min-height="40"
      :max-height="300"
      ref="editBodyComment"
      v-model="editBodyComment"
      @keydown.enter.native.exact.prevent
      @keyup.enter.native.exact="updateComment(activity._id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

const namespaceAvatar: string = 'avatar'
const namespaceActivities: string = 'activities'

@Component({})
export default class ActivitiesCommentBox extends Vue {
  @Prop() private isOpenCommentBox!: boolean
  @Prop() private activity!: object
  @Prop() private editComment!: boolean
  @Prop() private originBodyComment!: string
  @Prop() private openEditCommentBox!: string

  @Getter('avatar', { namespace: namespaceAvatar }) private avatar: any

  @Action('setAddComment', { namespace: namespaceActivities }) private setAddComment: any

  private message: string = ''
  private bodyComment: string = ''
  private editBodyComment: string = this.originBodyComment ? this.originBodyComment : ''

  private addComment (id: string): void {
    const params = {
      activityId: id,
      body: this.bodyComment
    }

    axios
      .post(config.api.comment, params)
      .then(function (response: Response) {
        this.$refs.comment.$el.value = ''
        this.setAddComment(response.data)
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.$toasted.error('Error happened!!!')
        }
      }.bind(this))
  }

  // private updateComment (id: string): void {}
}
</script>
