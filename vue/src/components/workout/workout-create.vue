<template>
  <div class="modal modal-xs fade text-left" v-show="setShowModalBackdrop && showCreateModal" :class="{ 'show animated bounceIn': setShowModalBackdrop && showCreateModal }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="text-secondary text-uppercase">Workout Information</h2>
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
              <button class="btn btn-sm btn-primary" @click.prevent="workoutCreate">
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
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

interface ParamsWorkoutCreate {
  name: string;
  'plan_id': string;
  'week_day': string;
}

interface dataItem {
  createdBy: string;
  name: string;
  weekDay: string;
}

const namespaceModal: string = 'modal'
const namespaceWorkouts: string = 'workouts'

@Component({
  components: {
  FontAwesomeIcon
  },
  })
export default class WorkoutCreate extends Vue {
  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any
  @Action('setShowCreateModal', { namespace: namespaceModal }) setShowCreateModal: any
  @Getter('showModalBackdrop', { namespace: namespaceModal }) showModalBackdrop: any
  @Getter('showCreateModal', { namespace: namespaceModal }) showCreateModal: any

  @Action('setCreateWorkout', { namespace: namespaceWorkouts }) setCreateWorkout: any

  loading: boolean = false
  message: string = ''
  workoutDay: string = ''
  workoutName: string = ''

  closeModal () {
    this.setShowModalBackdrop(false)
    this.setShowCreateModal(false)
  }

  workoutCreate () {
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
      .post(config.domainAddress + config.api.workout, params)
      .then(function (response: Response) {
        const dataItem: dataItem = {
          createdBy: response.data.created_by,
          name: response.data.name,
          weekDay: response.data.week_day
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
