<template>
  <div class="comments">
    <hr class="m-0" />

    <ActivitiesListComments :activity="activity" />

    <ActivitiesCommentBox :activity="activity" ref="activitiesCommentBox" v-show="isOpenCommentBox" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

import ActivitiesCommentBox from './activities-comment-box.vue'
import ActivitiesListComments from './activities-list-comments.vue'

@Component({
  components: {
  ActivitiesCommentBox,
  ActivitiesListComments
  }
  })
export default class ActivitiesComments extends Vue {
  @Prop() private isOpenCommentBox!: boolean
  @Prop() private activity!: object
}
</script>
