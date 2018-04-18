<template>
  <div class="row">
    <div class="col-12 col-lg-8 offset-lg-2">
      <table class="table table-striped table-bordered table-hover text-center list-workout">
        <thead class="thead-dark">
          <tr>
            <th>name</th>
            <th>week day</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="workout in getListWorkout">
            <td>
              <router-link :to="'../exercise/' + workout._id" class="text-primary text-capitalize">{{ workout.name }}</router-link>
            </td>

            <td>{{ workout.week_day }}</td>

            <td>
              <a href="" class="btn btn-sm btn-secondary mr-1" @click.prevent="updateWorkout(workout)">Edit</a>

              <a href="" class="btn btn-sm btn-danger" @click.prevent="deleteWorkout(workout._id)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>

      <app-workout-update :data-workout-origin="dataWorkoutOrigin"></app-workout-update>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'

import AppWorkoutUpdate from './AppWorkoutUpdate.vue'

export default {
  name: 'AppListWorkout',

  components: { AppWorkoutUpdate },

  data () {
    return {
      dataWorkoutOrigin: ''
    }
  },

  computed: {
    getListWorkout () {
      return this.$store.getters.listWorkout
    }
  },

  methods: {
    updateWorkout (workout) {
      this.$store.dispatch('setShowBackgroundModal', true)
      this.$store.dispatch('setShowUpdateModal', true)
      this.dataWorkoutOrigin = workout
    },

    deleteWorkout (id) {
      this.$store.dispatch('setDeleteWorkout', id)

      axios
        .delete(config.domainAddress + config.api.workout + id)
        .then(function () {
          this.$toasted.success('Delete Successfully!!!')
        }.bind(this))
        .catch(function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            this.errContent = error.response.data.message
          } else {
            this.errContent = 'Error happened.'
          }

          this.$toasted.error('Error happened!!!')
        }.bind(this))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
@import '../../assets/scss/mixins.scss';

.list-workout {
  thead {
    tr {
      th {
        text-align: center;
      }
    }
  }
}
</style>
