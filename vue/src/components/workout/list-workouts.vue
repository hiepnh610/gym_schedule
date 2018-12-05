<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <table class="table table-striped text-center mb-5">
          <thead>
            <tr>
              <th>image</th>
              <th>name</th>
              <th>week day</th>
              <th>quantity</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(workout, index) in listWorkouts" :key="index">
              <td>
                <div class="image">
                  <font-awesome-icon icon="image" v-if="workout.exercises.length <= 0" />

                  <img :src="workout.exercises[0].image" alt="" v-else />
                </div>
              </td>

              <td>
                <router-link :to="'../exercises/' + workout._id" class="text-capitalize">{{ workout.name }}</router-link>
              </td>

              <td>{{ workout.weekDay }}</td>

              <td>
                <span v-if="workout.exercises.length > 0">{{ workout.exercises.length }}</span>

                <span v-else>0</span>
              </td>

              <td>
                <a href="" class="btn btn-sm btn-warning mr-1" @click.prevent="updateWorkout(workout)">Edit</a>

                <a href="" class="btn btn-sm btn-danger" @click.prevent="deleteWorkout(workout._id)">Remove</a>
              </td>
            </tr>
          </tbody>
        </table>

        <workout-update :data-workout-origin="dataWorkoutOrigin"></workout-update>
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

import workoutUpdate from './workout-update.vue'

const namespaceModal: string = 'modal'
const namespaceWorkouts: string = 'workouts'

@Component({
  components: {
  workoutUpdate,
  FontAwesomeIcon
  },
  })
export default class ListWorkouts extends Vue {
  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any
  @Action('setShowUpdateModal', { namespace: namespaceModal }) setShowUpdateModal: any

  @Action('setDeleteWorkout', { namespace: namespaceWorkouts }) setDeleteWorkout: any
  @Getter('listWorkouts', { namespace: namespaceWorkouts }) listWorkouts: any

  message: string = ''
  dataWorkoutOrigin: any = ''
  quantity: number = 0

  updateWorkout (workout: any) {
    this.dataWorkoutOrigin = workout

    this.setShowModalBackdrop(true)
    this.setShowUpdateModal(true)
  }

  deleteWorkout (id: string) {
    this.setDeleteWorkout(id)

    axios
      .delete(config.api.workout + id)
      .then(function () {
        this.$toasted.success('Delete Successfully!!!')
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }

        this.$toasted.error('Error happened!!!')
      }.bind(this))
  }
}
</script>
