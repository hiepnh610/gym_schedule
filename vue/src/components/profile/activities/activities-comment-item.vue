<template>
  <div class="d-flex align-items-start w-100">
    <div class="avatar mr-2">
      <img :src="comment.avatar" alt="" v-if="comment.avatar" />

      <img src="@/assets/images/avatar-default.png" alt="" v-else />
    </div>

    <div class="comment-wrap-body flex-grow-1">
      <div class="d-flex align-items-center">
        <div class="comment-body p-2 border-radius bg-muted d-inline-block" :class="{ 'w-100': openEditCommentBox }">
          <p class="smaller mb-0" v-show="!openEditCommentBox">
            <strong class="text-primary mb-2">{{ comment.full_name }}</strong>

            {{ comment.body }}
          </p>

          <ActivitiesCommentBox :editComment="true" :activity="activity" :openEditCommentBox="openEditCommentBox" :comment="comment" ref="editCommentBox" @changeEditCommentBox="showCommentBody" />
        </div>

        <div class="pl-2" v-if="user.username === comment.username || isOwner">
          <div class="dropdown float-right">
            <div class="dropdown-toggle" ref="dropdown-toggle">
              <font-awesome-icon icon="ellipsis-h" />
            </div>

            <div class="dropdown-menu">
              <a href="#" class="dropdown-item" @click.prevent="updateComment()" v-if="user.username === comment.username">Edit</a>

              <a href="#" class="dropdown-item" @click.prevent="deleteComment(comment._id)">Remove</a>
            </div>
          </div>
        </div>
      </div>

      <div class="d-block" v-if="!openEditCommentBox">
        <a href="#" class="d-inline-block text-primary smallest">Like</a>

        <div class="d-inline-block text-muted smallest ml-3">{{ comment.updatedAt | time_ago }}</div>

        <div class="d-inline-block text-muted smallest ml-3" v-if="comment.edited">Edited</div>
      </div>

      <div class="d-block" v-else>
        <a href="#" class="d-inline-block text-primary smallest" @click.prevent="closeUpdateComment()">Done</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import axios from 'axios'

import config from '@/config'
import { Response, CommentType, ActivityType } from '@/util'

import ActivitiesCommentBox from './activities-comment-box.vue'

const namespaceUser: string = 'user'
const namespaceActivities: string = 'activities'

@Component({
  components: {
  ActivitiesCommentBox
  }
  })
export default class ActivitiesCommentItem extends Vue  {
  @Prop() private comment!: CommentType[]
  @Prop() private isOwner!: boolean
  @Prop() private activity!: ActivityType[]

  @Getter('user', { namespace: namespaceUser }) private user: any

  @Action('setDeleteComment', { namespace: namespaceActivities }) private setDeleteComment: any

  private openEditCommentBox: boolean = false

  private deleteComment (id: string): void {
    axios
      .delete(config.api.comment + id)
      .then(function () {
        this.setDeleteComment(id)
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }

        this.$toasted.error('Error happened!!!')
      }.bind(this))
  }

  private updateComment (): void {
    const $editCommentBox: any = this.$refs.editCommentBox
    const $textarea: any = $editCommentBox.$refs.editBodyComment.$el

    this.openEditCommentBox = true

    this.$nextTick(() => $textarea.focus())
  }

  private closeUpdateComment (): void {
    this.openEditCommentBox = false
  }

  private showCommentBody (val: boolean) {
    console.log(val)
    this.openEditCommentBox = val
  }
}
</script>
