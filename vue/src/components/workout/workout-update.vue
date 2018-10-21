<template>
  <div class="modal modal-xs fade text-left" v-show="setShowModalBackdrop && showUpdateModal" :class="{ 'show animated bounceIn': setShowModalBackdrop && showUpdateModal }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="text-secondary text-uppercase">Update Information</h2>
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

                <div class="select-custom">
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

            <div class="form-group form-button text-center mb-0">
              <button class="btn btn-sm btn-danger" @click.prevent="workoutUpdate(dataWorkoutOrigin._id)">
                Submit
                <font-awesome-icon icon="spinner" spin v-if="loading" />
              </button>

              <button class="btn btn-sm btn-secondary" @click.prevent="closeModal">Cancel</button>
            </div>
          </form>
        </div>
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

interface ParamsWorkoutUpdate {
  name: string;
  'week_day': string;
}

const namespaceModal: string = 'modal'
const namespaceWorkouts: string = 'workouts'

@Component({
  components: {
  FontAwesomeIcon
  },
  })
export default class WorkoutUpdate extends Vue {
  @Prop() dataWorkoutOrigin!: any

  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any
  @Action('setShowUpdateModal', { namespace: namespaceModal }) setShowUpdateModal: any
  @Getter('showUpdateModal', { namespace: namespaceModal }) showUpdateModal: any

  @Action('setUpdateWorkout', { namespace: namespaceWorkouts }) setUpdateWorkout: any

  loading: boolean = false
  message: string = ''
  workoutDay: string = ''
  workoutName: string = ''

  closeModal () {
    this.setShowModalBackdrop(false)
    this.setShowUpdateModal(false)
  }

  workoutUpdate (id: string) {
    if (!this.workoutName) {
      this.message = 'The workout name cannot be blank.'

      return
    }

    if (!this.workoutDay) {
      this.message = 'The workout day cannot be blank.'

      return
    }

    const params: ParamsWorkoutUpdate = {
      name: this.workoutName,
      week_day: this.workoutDay
    }

    this.loading = true

    axios
      .put(config.domainAddress + config.api.workout + id, params)
      .then(function (response: Response) {
        this.loading = false

        this.setShowModalBackdrop(false)
        this.setShowUpdateModal(false)
        this.setUpdateWorkout(response.data)

        this.$toasted.success('Update Successfully!!!')
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errContent = error.response.data.message
        } else {
          this.$toasted.error('Error happened!!!')
        }

        this.loading = false
      }.bind(this))
  }

  @Watch('dataWorkoutOrigin', { immediate: true, deep: true })
  dataWorkout (val: any, oldVal: any) {
    this.workoutDay = val.weekDay
    this.workoutName = val.name
  }
}
</script>
