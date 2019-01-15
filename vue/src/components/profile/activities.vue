<template>
  <div class="activities-list">
    <div class="activity" v-for="(activities, key) in listActivities" :key="key">
      <h6 class="activity-date">{{moment(key).format('MMMM D, YYYY')}}</h6>

      <div class="activity-body" v-for="(activity, key) in activities" :key="key">
        <header class="px-3 pt-3 pb-2">
          <div class="avatar d-inline-block mr-3 align-top">
            <img :src="avatar" alt="" v-if="avatar" />

            <img src="@/assets/images/avatar-default.png" alt="" v-else />
          </div>

          <p class="d-inline-block mb-0">
            <strong class="d-block text-primary">{{ fullName }}</strong>

            <small class="text-muted">{{moment(activity.created_at).format('MMMM D, YYYY [at] h:m A')}}</small>
          </p>

          <font-awesome-icon icon="ellipsis-h" class="text-muted more-options" />
        </header>

        <hr class="m-0" />

        <section class="px-3 py-2">
          <strong>{{ activity.workout_name }}</strong>

          <p class="mb-0">
            <small class="text-muted">Exercises: {{ activity.exercises.length }}</small>
          </p>
        </section>

        <hr class="m-0" />

        <footer>
          <div class="profile-like d-inline-block py-2 px-3 border-right">
            <font-awesome-icon :icon="['far', 'heart']" class="text-muted" />
          </div>

          <div class="profile-comment d-inline-block py-2 px-3 border-right">
            <font-awesome-icon :icon="['far', 'comment-alt']" class="text-muted" />
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

const namespaceAvatar: string = 'avatar'
const namespaceActivities: string = 'activities'

@Component({
  components: {
  FontAwesomeIcon
  }
  })
export default class ProfileActivities extends Vue {
  @Getter('avatar', { namespace: namespaceAvatar }) avatar: any

  @Action('setListActivities', { namespace: namespaceActivities }) setListActivities: any
  @Action('setDeleteActivity', { namespace: namespaceActivities }) setDeleteActivity: any
  @Getter('listActivities', { namespace: namespaceActivities }) listActivities: any

  fullName!: string

  created () {
    const _this: any = this

    if (_this.$session.exists()) {
      const username = _this.$session.get('username')

      this.fullName = _this.$session.get('name')
    }

    axios
      .get(config.api.activities)
      .then(function (response: Response) {
        this.setListActivities(response.data)
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }
      }.bind(this))
  }
}
</script>
