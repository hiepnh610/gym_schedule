<template>
  <div class="activities-list">
    <div class="activity" v-for="(activities, key) in listActivities" :key="key">
      <h6 class="activity-date" v-if="activities.length > 0">{{ key | revert_date }}</h6>

      <div class="activity-body" v-for="(activity, key) in activities" :key="key">
        <header class="px-3 pt-3 pb-2">
          <div class="avatar d-inline-block mr-3 align-top">
            <img :src="avatar" alt="" v-if="avatar" />

            <img src="@/assets/images/avatar-default.png" alt="" v-else />
          </div>

          <p class="d-inline-block mb-0">
            <strong class="d-block text-primary">{{ fullName }}</strong>

            <small class="text-muted">{{ activity.created_at | revert_date_with_time }}</small>
          </p>

          <div class="dropdown float-right">
            <div class="dropdown-toggle" ref="dropdown-toggle">
              <font-awesome-icon icon="caret-down" />
            </div>

            <div class="dropdown-menu">
              <a href="#" class="dropdown-item" @click.prevent="removeActivity(activity['_id'])">Remove</a>
            </div>
          </div>
        </header>

        <hr class="m-0" />

        <section class="px-3 py-2">
          <strong>{{ activity.workout_name }}</strong>

          <p class="mb-0">
            <small class="text-muted" v-if="activity.exercises.length === 1">Quantity: {{ activity.exercises.length }} exercise</small>

            <small class="text-muted" v-else-if="activity.exercises.length > 1">Quantity: {{ activity.exercises.length }} exercises</small>

            <small class="mr-3" v-if="weightTotal(activity.exercises) > 0"></small>

            <small class="text-muted" v-if="weightTotal(activity.exercises) > 0">Weight: {{ weightTotal(activity.exercises) }} kg</small>
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

interface SetType {
  reps?: number;
  weight?: number;
}

interface Exercise {
  'exercise_id'?: string;
  'exercise_log'?: Array<SetType>;
  'exercise_image'?: string;
  'exercise_name'?: string;
  'exercise_note'?: string;
}

const namespaceActivities: string = 'activities'

@Component({
  components: {
  FontAwesomeIcon
  }
  })
export default class ProfileActivities extends Vue {
  @Prop() fullName!: string
  @Prop() avatar!: string

  @Action('setListActivities', { namespace: namespaceActivities }) setListActivities: any
  @Action('setDeleteActivity', { namespace: namespaceActivities }) setDeleteActivity: any
  @Getter('listActivities', { namespace: namespaceActivities }) listActivities: any

  created () {
    const _this: any = this
    const usernameFromUrl: string = window.location.pathname.replace('/profile/', '').replace('/', '')
    const params = {
      username: usernameFromUrl
    }

    axios
      .get(config.api.profileActivities, { params })
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

  removeActivity (id: string) {
    axios
      .delete(config.api.activities + id)
      .then(function () {
        this.setDeleteActivity(id)

        this.$toasted.success('Delete Successfully!!!')
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

  weightTotal (exercises: Array<Exercise>) {
    let total: number = 0

    for (let key in exercises) {
      let exerciseLog: Array<SetType> = exercises[key]['exercise_log'] || []

      for (let key2 in exerciseLog) {
        let weight: number = exerciseLog[key2].weight || 0

        total += weight
      }
    }

    return total
  }
}
</script>
