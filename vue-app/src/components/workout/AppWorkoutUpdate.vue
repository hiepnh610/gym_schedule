<template>
  <div class="modal modal-xs fade text-left" v-show="showBackgroundModal && showUpdateModal" :class="{ 'show animated bounceIn': showBackgroundModal && showUpdateModal }" :style="{ display: 'block' }">
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

<script>
  import axios from 'axios'
  import config from '@/config'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  export default {
    name: 'AppWorkoutUpdate',

    components: { FontAwesomeIcon },

    props: ['dataWorkoutOrigin'],

    data () {
      return {
        workoutName: '',
        workoutDay: '',
        message: '',
        loading: false
      }
    },

    methods: {
      closeModal () {
        this.$store.dispatch('setShowBackgroundModal', false)
      },

      workoutUpdate (id) {
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
          .then(function (response) {
            this.loading = false

            this.$store.dispatch('setShowBackgroundModal', false)
            this.$store.dispatch('setUpdateWorkout', response.data)

            this.$toasted.success('Update Successfully!!!')
          }.bind(this))
          .catch(function (error) {
            if (error.response && error.response.data && error.response.data.message) {
              this.errContent = error.response.data.message
            } else {
              this.$toasted.error('Error happened!!!')
            }

            this.loading = false
          }.bind(this))
      }
    },

    computed: {
      showBackgroundModal () {
        return this.$store.getters.showBackgroundModal
      },

      showUpdateModal () {
        return this.$store.getters.showUpdateModal
      },

      dataWorkout () {
        return this.dataWorkoutOrigin
      }
    },

    watch: {
      dataWorkout () {
        this.workoutName = this.dataWorkout.name
        this.workoutDay = this.dataWorkout.week_day
      }
    }
  }
</script>

<style lang="scss"></style>
