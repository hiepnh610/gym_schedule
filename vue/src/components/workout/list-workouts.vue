<template>
  <div class="row">
    <div class="col-12 col-lg-8 offset-lg-2">
      <table class="table table-bordered list-workout text-center mb-5">
        <thead class="bg-success">
          <tr>
            <th>name</th>
            <th>week day</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="workout in getListWorkout" :key="workout._id">
            <td>
              <router-link :to="'../exercise/' + workout._id" class="text-success text-capitalize">{{ workout.name }}</router-link>
            </td>

            <td>{{ workout.week_day }}</td>

            <td>
              <a href="" class="btn btn-sm btn-secondary mr-1" @click.prevent="updateWorkout(workout)">Edit</a>

              <a href="" class="btn btn-sm btn-danger" @click.prevent="deleteWorkout(workout._id)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>

      <workout-update :data-workout-origin="dataWorkoutOrigin"></workout-update>
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

import workoutUpdate from './workout-update.vue'

const namespaceModal: string = 'modal'
const namespaceWorkout: string = 'workout'

@Component({
  components: {
  workoutUpdate
  },
  })
export default class ListWorkouts extends Vue {
  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any
  @Action('setShowUpdateModal', { namespace: namespaceModal }) setShowUpdateModal: any

  @Action('setDeleteWorkout', { namespace: namespaceWorkout }) setDeleteWorkout: any
  @Getter('listWorkouts', { namespace: namespaceWorkout }) listWorkouts: any

  errContent: string = ''
  dataWorkoutOrigin: any = ''

  updateWorkout (workout: any) {
    this.setShowModalBackdrop(true)
    this.setShowUpdateModal(true)
    this.dataWorkoutOrigin = workout
  }

  deleteWorkout (id: string) {
    this.setDeleteWorkout(id)

    axios
      .delete(config.domainAddress + config.api.workout + id)
      .then(function () {
        this.$toasted.success('Delete Successfully!!!')
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errContent = error.response.data.message
        } else {
          this.errContent = 'Error happened.'
        }

        this.$toasted.error('Error happened!!!')
      }.bind(this))
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variables.scss';
  @import '../../assets/scss/mixins.scss';

  .list-workout {
    border-style: dotted;

    th, td {
      border-style: dotted;
    }

    thead {
      tr {
        th {
          color: $white;
          border-bottom-width: 1px;
          text-align: center;
        }
      }
    }
  }
</style>
