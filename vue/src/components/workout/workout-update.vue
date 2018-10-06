<template>
  <div class="modal modal-xs fade text-left" v-show="setShowModalBackdrop && showUpdateModal" :class="{ 'show animated bounceIn': setShowModalBackdrop && showUpdateModal }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <h2 class="text-center mb-4 text-success">Workout Information</h2>

          <form>
            <div class="form-group">
              <label for="name-workout">Workout Day Name</label>

              <input type="text" id="name-workout" class="form-control" v-model="workoutName" />
            </div>

            <div class="form-group">
              <label for="workout-day">Pick a Workout Day</label>

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

            <p v-show="message" class="text-danger">{{ message }}</p>

            <div class="form-group text-center mb-0">
              <button class="btn btn-md btn-success" @click.prevent="workoutUpdate(dataWorkoutOrigin._id)">
                Submit
                <font-awesome-icon icon="spinner" spin v-if="loading" />
              </button>

              <button class="btn btn-md btn-secondary" @click.prevent="closeModal">Cancel</button>
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

const namespaceModal: string = 'modal'
const namespaceWorkout: string = 'workout'

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

  @Action('setUpdateWorkout', { namespace: namespaceWorkout }) setUpdateWorkout: any

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

    const params = {
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
    this.workoutName = val.name
    this.workoutDay = val.week_day
  }
}
</script>

<style lang="scss"></style>
