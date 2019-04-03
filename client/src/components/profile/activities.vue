<template>
  <div class="activities-list" v-if="listActivities">
    <div class="activity" v-for="(activities, key) in listActivities" :key="key">
      <h6 class="activity-date" v-if="activities.length > 0">{{ key | revert_date }}</h6>

      <div class="activity-body" v-for="(activity, key) in activities" :key="key">
        <header class="p-2">
          <div class="avatar d-inline-block mr-2 align-top">
            <img :src="avatarOfThread" alt="" v-if="avatarOfThread" />

            <img src="@/assets/images/avatar-default.png" alt="" v-else />
          </div>

          <p class="d-inline-block mb-0">
            <strong class="d-block text-primary smaller">{{ fullName }}</strong>

            <small class="text-muted smallest">{{ activity.created_at | revert_date_with_time }}</small>
          </p>

          <div class="dropdown float-right" v-if="isOwner">
            <div class="dropdown-toggle" ref="dropdown-toggle">
              <font-awesome-icon icon="caret-down" />
            </div>

            <div class="dropdown-menu">
              <a href="#" class="dropdown-item" @click.prevent="removeActivity(activity['_id'])">Remove</a>
            </div>
          </div>
        </header>

        <hr class="m-0" />

        <section class="px-2 py-1">
          <strong>{{ activity.workout_name }}</strong>

          <p class="mb-0">
            <small class="text-muted" v-if="activity.exercises && activity.exercises.length === 1">Quantity: {{ activity.exercises.length }} exercise</small>

            <small class="text-muted" v-else-if="activity.exercises && activity.exercises.length > 1">Quantity: {{ activity.exercises.length }} exercises</small>

            <small class="mr-3" v-if="activity.exercises && weightTotal(activity.exercises) > 0"></small>

            <small class="text-muted" v-if="activity.exercises && weightTotal(activity.exercises) > 0">Weight: {{ weightTotal(activity.exercises) }} kg</small>
          </p>

          <p class="mb-0" v-if="activity.like.quantity">
            <small class="text-muted smallest" v-if="activity.like.quantity > 1">
              <font-awesome-icon :icon="['far', 'heart']" class="mr-1" />

              {{ activity.like.quantity }} Likes
            </small>

            <small class="text-muted smallest" v-else-if="activity.like.quantity === 1">
              <font-awesome-icon :icon="['far', 'heart']" class="mr-1" />

              {{ activity.like.quantity }} Like
            </small>
          </p>
        </section>

        <hr class="m-0" />

        <ActivitiesFooter :isOwner="isOwner" :activity="activity" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

import ActivitiesFooter from './activities/activities-footer.vue'

interface SetType {
  reps?: number
  weight?: number
}

interface Exercise {
  'exercise_id'?: string
  'exercise_log'?: SetType[]
  'exercise_image'?: string
  'exercise_name'?: string
  'exercise_note'?: string
}

const namespaceActivities: string = 'activities'

@Component({
  components: {
  FontAwesomeIcon,
  ActivitiesFooter
  }
  })
export default class ProfileActivities extends Vue {
  @Prop() private fullName!: string
  @Prop() private avatarOfThread!: string
  @Prop() private isOwner!: boolean

  @Action('setListActivities', { namespace: namespaceActivities }) private setListActivities: any
  @Action('setDeleteActivity', { namespace: namespaceActivities }) private setDeleteActivity: any
  @Getter('listActivities', { namespace: namespaceActivities }) private listActivities: any

  private getUserActivities (): void {
    const usernameFromUrl: string = this.$route.params.user
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

  private removeActivity (id: string) {
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

  private weightTotal (exercises: Exercise[]) {
    let total: number = 0

    for (const exercise of exercises) {
      const exerciseLog: SetType[] = exercise.exercise_log || []

      for (const exercise2 of exerciseLog) {
        const weight: number = exercise2.weight || 0

        total += weight
      }
    }

    return total
  }

  @Watch('$route', { immediate: true, deep: true })
  private urlChanged () {
    this.getUserActivities()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/elements/profile/_activities.scss";
</style>
