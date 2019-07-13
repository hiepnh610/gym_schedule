<template>
  <div class="modal modal-xs fade text-left" v-show="setShowModalBackdrop && showCreateModal" :class="{ 'show animated fadeInUp': setShowModalBackdrop && showCreateModal }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title text-primary text-uppercase">Workout Information</h2>
        </div>

        <div class="modal-body">
          <form>
            <div class="form-group-header">
              <div class="form-group input-group-lg">
                <label for="name-workout">Workout Day Name</label>

                <input type="text" id="name-workout" class="form-control" v-model="workoutName" />
              </div>

              <div class="form-group input-group-lg">
                <label for="workout-day">Pick a Workout Day</label>

                <div class="form-group-has-icon">
                  <font-awesome-icon icon="caret-down" />

                  <select id="workout-day" class="form-control" v-model="workoutDay">
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>
              </div>

              <p v-show="message" class="text-danger">{{ message }}</p>
            </div>

            <div class="form-group form-button text-right mb-0">
              <button class="btn btn-xs btn-transparent m-0" @click.prevent="closeModal">Cancel</button>

              <button class="btn btn-xs btn-secondary m-0" @click.prevent="workoutCreate">
                Submit
                <font-awesome-icon icon="spinner" spin v-if="loading" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

interface ParamsWorkoutCreate {
  name: string
  'plan_id': string
  'week_day': string
}

interface DataItem {
  createdBy: string
  name: string
  weekDay: string
  _id: string
}

const namespaceModal: string = 'modal'
const namespaceWorkouts: string = 'workouts'

@Component
export default class WorkoutCreate extends Vue {
  @Action('setShowModalBackdrop', { namespace: namespaceModal }) private setShowModalBackdrop: any
  @Action('setShowCreateModal', { namespace: namespaceModal }) private setShowCreateModal: any
  @Getter('showModalBackdrop', { namespace: namespaceModal }) private showModalBackdrop: any
  @Getter('showCreateModal', { namespace: namespaceModal }) private showCreateModal: any

  @Action('setCreateWorkout', { namespace: namespaceWorkouts }) private setCreateWorkout: any

  private loading: boolean = false
  private message: string = ''
  private workoutDay: string = ''
  private workoutName: string = ''

  private closeModal () {
    this.workoutName = ''
    this.workoutDay = ''

    this.setShowModalBackdrop(false)
    this.setShowCreateModal(false)
  }

  private workoutCreate () {
    if (!this.workoutName) {
      this.message = 'The workout name cannot be blank.'

      return
    }

    if (!this.workoutDay) {
      this.message = 'The workout day cannot be blank.'

      return
    }

    const params: ParamsWorkoutCreate = {
      name: this.workoutName,
      plan_id: this.$route.params.id,
      week_day: this.workoutDay
    }

    this.loading = true

    axios
      .post(config.api.workout, params)
      .then(function (response: Response) {
        const dataItem: DataItem = {
          createdBy: response.data.created_by,
          name: response.data.name,
          weekDay: response.data.week_day,
          _id: response.data._id
        }

        this.loading = false

        this.workoutName = ''
        this.workoutDay = ''

        this.setCreateWorkout(dataItem)
        this.setShowModalBackdrop(false)
        this.setShowCreateModal(false)

        this.$toasted.success('Create Successfully!!!')
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.$toasted.error('Error happened!!!')
        }

        this.loading = false
      }.bind(this))
  }
}
</script>
