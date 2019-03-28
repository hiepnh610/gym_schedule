<template>
  <div class="comments-list" v-if="activity.comments">
    <div class="view-more-comment text-primary smaller px-2 pt-2" v-if="activity.comments.length > 1">View 0 more comments</div>

    <div class="comment d-flex align-items-start p-2" v-for="(comment, key) in activity.comments" :key="key">
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
}
</script>
