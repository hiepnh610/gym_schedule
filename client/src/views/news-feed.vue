<template>
  <div id="news-feed">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-8">
          <div class="activities-list" v-if="listActivities">
            <div class="activity" v-for="(activities, key) in listActivities" :key="key">
              <h6 class="activity-date" v-if="activities.length > 0">{{ key | revert_date }}</h6>

              <div class="activity-body" v-for="(activity, key) in activities" :key="key">
                <header class="p-2">
                  <div class="small-avatar d-inline-block mr-2 align-top">
                    <img :src="activity.avatar" alt="" v-if="activity.avatar" />

                    <img src="@/assets/images/avatar-default.png" alt="" v-else />
                  </div>

                  <p class="d-inline-block mb-0">
                    <strong class="d-block text-primary smaller">{{ activity.full_name }}</strong>

                    <small class="text-muted smallest">{{ activity.created_at | revert_date_with_time }}</small>
                  </p>
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

                  <p class="mb-0" v-if="activity.like && activity.like.quantity">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

import ActivitiesFooter from '@/components/profile/activities/activities-footer.vue'

const namespaceUser: string = 'user'
const namespaceActivities: string = 'activities'

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

@Component({
  components: {
  ActivitiesFooter
  }
  })
export default class NewsFeed extends Vue {
  @Getter('user', { namespace: namespaceUser }) private user: any

  @Action('setListActivities', { namespace: namespaceActivities }) private setListActivities: any
  @Getter('listActivities', { namespace: namespaceActivities }) private listActivities: any

  private message: string = ''
  private isOwner: boolean = false

  private created (): void {
    axios
      .get(config.api.newsFeed)
      .then(function (response: Response) {
        if (response.data) {
          this.setListActivities(response.data)
        }
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }
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

  @Watch('user', { immediate: true, deep: true })
  private getUserData (val: any) {
    const usernameFromUrl: string = this.$route.params.user
    const usernameFromLocal: string = val.username

    if (usernameFromLocal === usernameFromUrl) {
      this.isOwner = true
    } else {
      this.isOwner = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/_news-feed.scss";
</style>
