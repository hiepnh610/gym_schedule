<template>
  <div class="text-center">
    <h1 class="text-center mb-5">{{ planName }}</h1>

    <list-workouts v-if="listWorkouts.length > 0"></list-workouts>

    <p v-if="listWorkouts.length === 0" class="align-center mb-5">Please create a workout day from the under button.</p>

    <a href="" class="btn btn-md btn-success" @click.prevent="createWorkout" v-if="displayBtn">
      <font-awesome-icon icon="plus-circle" />
      Create Workout Day
    </a>

    <workout-create></workout-create>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import config from '@/config'
import { Response, ID } from '@/util'

import workoutCreate from '@/components/workout/workout-create.vue'
import listWorkouts from '@/components/workout/list-workouts.vue'

const namespaceModal: string = 'modal'
const namespaceWorkouts: string = 'workouts'

@Component({
  components: {
  workoutCreate,
  listWorkouts,
  FontAwesomeIcon,
  },
  })
export default class Workouts extends Vue {
  @Prop() id!: string

  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any
  @Action('setShowCreateModal', { namespace: namespaceModal }) setShowCreateModal: any

  @Action('setListWorkouts', { namespace: namespaceWorkouts }) setListWorkouts: any
  @Getter('listWorkouts', { namespace: namespaceWorkouts }) listWorkouts: any

  planName: string = ''
  planFrequency: string = ''
  message: string = ''

  createWorkout () {
    this.setShowModalBackdrop(true)
    this.setShowCreateModal(true)
  }

  created () {
    const params: ID = {
      id: this.id
    }

    axios
      .get(config.domainAddress + config.api.workout, { params })
      .then(function (response: Response) {
        this.setListWorkouts(response.data)
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }
      }.bind(this))

    axios
      .get(config.domainAddress + config.api.listPlans, {
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
