<template>
  <div class="comment-box p-2 d-flex align-items-start">
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
  @Prop() private activity!: object

  @Getter('avatar', { namespace: namespaceAvatar }) private avatar: any

  @Action('setAddComment', { namespace: namespaceActivities }) private setAddComment: any

  private message: string = ''
  private bodyComment: string = ''

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
}
</script>
