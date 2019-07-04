<template>
  <footer>
    <div class="profile-like d-inline-block py-2 px-3 border-right not-cursor" v-if="isOwner">
      <font-awesome-icon :icon="['fas', 'heart']" class="text-muted" />
    </div>

    <div class="profile-like d-inline-block py-2 px-3 border-right" v-else-if="!isOwner && !activity.like.status" @click.prevent="likeActivity(activity._id)">
      <font-awesome-icon :icon="['far', 'heart']" class="text-muted" />
    </div>

    <div class="profile-like d-inline-block py-2 px-3 border-right" v-else @click.prevent="unLikeActivity(activity._id)">
      <font-awesome-icon :icon="['fas', 'heart']" class="text-primary" />
    </div>

    <div class="profile-comment d-inline-block py-2 px-3 border-right" @click.prevent="openCommentBox()">
      <font-awesome-icon :icon="['far', 'comment-alt']" class="text-muted" />
    </div>

    <div class="comments">
      <hr class="m-0" v-if="activity.comments || isOpenCommentBox" />

      <ActivitiesCommentsList :activity="activity" :isOwner="isOwner" />

      <ActivitiesCommentBox :editComment="false" :activity="activity" ref="activitiesCommentBox" :isOpenCommentBox="isOpenCommentBox" />
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

import ActivitiesCommentBox from './activities-comment-box.vue'
import ActivitiesCommentsList from './activities-comments-list.vue'

const namespaceActivities: string = 'activities'

interface Params {
  'object_id': string
  'object_type': string
}

@Component({
  components: {
  ActivitiesCommentBox,
  ActivitiesCommentsList
  }
  })
export default class ProfileActivitiesComments extends Vue {
  @Prop() private isOwner!: boolean
  @Prop() private activity!: object

  @Action('setLikeActivity', { namespace: namespaceActivities }) private setLikeActivity: any
  @Action('setUnlikeActivity', { namespace: namespaceActivities }) private setUnlikeActivity: any

  private message: string = ''
  private isOpenCommentBox: boolean = false

  private likeActivity (id: string): void {
    this.likeAndUnlikeActivity('like', id)
  }

  private unLikeActivity (id: string): void {
    this.likeAndUnlikeActivity('unlike', id)
  }

  private likeAndUnlikeActivity (status: string, id: string): void {
    const params: Params = {
      object_id: id,
      object_type: 'activity'
    }

    axios
      .post(config.api.likeActivity, params)
      .then(function (response: Response) {
        if (status === 'like') {
          this.setLikeActivity(id)
        } else {
          this.setUnlikeActivity(id)
        }
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.$toasted.error('Error happened!!!')
        }
      }.bind(this))
  }

  private openCommentBox (): void {
    const $activitiesComments: any = this.$refs.activitiesCommentBox
    const $textarea: any = $activitiesComments.$refs.comment.$el

    this.isOpenCommentBox = true

    this.$nextTick(() => $textarea.focus())
  }
}
</script>
