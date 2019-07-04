<template>
  <div>
    <div class="comment-box p-2 d-none align-items-start" :class="{ 'd-flex': (isOpenCommentBox || activity.comments) && !editComment }">
      <div class="small-avatar mr-2">
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

    <div class="comment-box d-none" :class="{ 'd-block': editComment && openEditCommentBox && editCommentIsOpen }">
      <textarea-autosize
      class="form-control"
      rows="1"
      :min-height="40"
      :max-height="300"
      ref="editBodyComment"
      v-model="editBodyComment"
      @keydown.enter.native.exact.prevent
      @keyup.enter.native.exact="updateComment(comment._id)"
      @keyup.esc.native.exact="closeEditCommentBox"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

interface Params {
  body: string
}

const namespaceAvatar: string = 'avatar'
const namespaceActivities: string = 'activities'

@Component({})
export default class ActivitiesCommentBox extends Vue {
  @Prop() private isOpenCommentBox!: boolean
  @Prop() private activity!: object
  @Prop() private comment!: object
  @Prop() private editComment!: boolean
  @Prop() private openEditCommentBox!: boolean

  @Getter('avatar', { namespace: namespaceAvatar }) private avatar: any

  @Action('setAddComment', { namespace: namespaceActivities }) private setAddComment: any
  @Action('setUpdateComment', { namespace: namespaceActivities }) private setUpdateComment: any

  private message: string = ''
  private bodyComment: string = ''
  private editBodyComment: string = ''
  private editCommentIsOpen: boolean = true
  private showEditComment: boolean = false

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

  private updateComment (id: string): void {
    const params: Params = {
      body: this.editBodyComment
    }

    axios
      .put(config.api.comment + id, params)
      .then(function (response: Response) {
        this.setUpdateComment(response.data)
        this.editCommentIsOpen = false
        this.changeEditCommentBox(false)
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.$toasted.error('Error happened!!!')
        }

        this.loading = false
      }.bind(this))
  }

  private closeEditCommentBox (): void {
    this.changeEditCommentBox(false)
  }

  @Watch('comment', { immediate: true, deep: true })
  private commentUpdated (val: any) {
    if (val) { this.editBodyComment = val.body }
  }

  @Emit('changeEditCommentBox')
  private changeEditCommentBox (val: boolean): void {
    this.showEditComment = val
  }
}
</script>
