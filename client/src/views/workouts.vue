<template>
  <div id="workouts-page" v-if="!isLoading">
    <div class="page-title mb-5">
      <div class="container">
        <h2 class="text-center mb-5">{{ planName }}</h2>
      </div>
    </div>

    <div class="container text-center">
      <button class="btn btn-sm btn-primary mb-5" @click.prevent="createWorkout" v-if="displayBtn">
        Create Workout
      </button>

      <p v-if="listWorkouts.length === 0">Please create a workout day from the under button.</p>
    </div>

    <list-workouts v-if="listWorkouts && listWorkouts.length > 0" />

    <workout-create />
  </div>

  <loading v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import axios from 'axios'

import config from '@/config'
import { Response, ID, setLoading } from '@/util'

import workoutCreate from '@/components/workout/workout-create.vue'
import listWorkouts from '@/components/workout/list-workouts.vue'
import Loading from '@/components/loading/loading.vue'

const namespaceModal: string = 'modal'
const namespaceWorkouts: string = 'workouts'

@Component({
  components: {
  workoutCreate,
  listWorkouts,
  Loading
  }
  })
export default class Workouts extends Vue {
  @Prop() private id!: string

  @Action('setShowModalBackdrop', { namespace: namespaceModal }) private setShowModalBackdrop: any
  @Action('setShowCreateModal', { namespace: namespaceModal }) private setShowCreateModal: any

  @Action('setListWorkouts', { namespace: namespaceWorkouts }) private setListWorkouts: any
  @Getter('listWorkouts', { namespace: namespaceWorkouts }) private listWorkouts: any

  private planName: string = ''
  private planFrequency: string = ''
  private message: string = ''
  private isLoading: boolean = true

  private createWorkout () {
    this.setShowModalBackdrop(true)
    this.setShowCreateModal(true)
  }

  private created () {
    const params: ID = {
      id: this.id
    }

    axios
      .get(config.api.workout, { params })
      .then(function (response: Response) {
        this.setListWorkouts(response.data)

        setLoading(this, false)
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }
      }.bind(this))

    axios
      .get(config.api.listPlans, {
        params: {
          id: this.id
        }
      })
      .then(function (response: Response) {
        this.planName = response.data[0].name
        this.planFrequency = response.data[0].frequency
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }
      }.bind(this))
  }

  get displayBtn () {
    if (this.listWorkouts.length < this.planFrequency) {
      return true
    }
  }
}
</script>
