<template>
  <div class="comments-list" v-if="activity.comments.length">
    <a href="#" class="view-more-comment text-primary smaller px-2 pt-2" v-if="!showAllCommentStatus && activity.comments.length > 2" @click.prevent="showAllComment">View {{ activity.comments.length - 2 }} more comments</a>

    <div class="comment d-none align-items-start p-2" v-for="(comment, key) in activity.comments" :key="key" :class="{ 'd-flex': key > (activity.comments.length - 3) || showAllCommentStatus }">
      <ActivitiesCommentItem :comment="comment" :isOwner="isOwner" :activity="activity" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import axios from 'axios'

import config from '@/config'
import { Response, ActivityType } from '@/util'

import ActivitiesCommentBox from './activities-comment-box.vue'
import ActivitiesCommentItem from './activities-comment-item.vue'

@Component({
  components: {
  ActivitiesCommentBox,
  ActivitiesCommentItem
  }
  })
export default class ActivitiesCommentsList extends Vue {
  @Prop() private activity!: ActivityType[]
  @Prop() private isOwner!: boolean

  private message: string = ''
  private showAllCommentStatus: boolean = false

  private showAllComment (): void {
    this.showAllCommentStatus = true
  }
}
</script>
