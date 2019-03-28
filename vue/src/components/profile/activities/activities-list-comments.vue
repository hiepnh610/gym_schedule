<template>
  <div class="comments-list" v-if="activity.comments.length">
    <hr class="m-0" />

    <div class="view-more-comment text-primary smaller px-2 pt-2" v-if="!showAllCommentStatus && activity.comments.length > 2" @click="showAllComment">View {{ activity.comments.length - 2 }} more comments</div>

    <div class="comment d-none align-items-start p-2" v-for="(comment, key) in activity.comments" :key="key" :class="{ 'd-flex': key > (activity.comments.length - 3) || showAllCommentStatus }">
      <div class="avatar mr-2">
        <img :src="comment.avatar" alt="" v-if="comment.avatar" />

        <img src="@/assets/images/avatar-default.png" alt="" v-else />
      </div>

      <div class="comment-wrap-body">
        <div class="comment-body p-2 border-radius bg-muted d-inline-block">
          <p class="smaller mb-0">
            <strong class="text-primary mb-2">{{ comment.full_name }}</strong>

            {{ comment.body }}
          </p>
        </div>

        <div class="d-block">
          <div class="d-inline-block text-primary smallest">Like</div>

          <div class="d-inline-block text-primary smallest ml-3">Comment</div>

          <div class="d-inline-block text-muted smallest ml-3">{{ comment.updatedAt | time_ago }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

import { ActivityType } from '@/util'

@Component({})
export default class ActivitiesListComments extends Vue {
  @Prop() private activity!: ActivityType[]

  private showAllCommentStatus: boolean = false

  private showAllComment (): void {
    this.showAllCommentStatus = true
  }
}
</script>
