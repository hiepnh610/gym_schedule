<template>
  <div class="container">
    <div class="row list-cards text-left">
      <div class="col-3" v-for="(workout, index) in listWorkouts" :key="index">
        <div class="card border">
          <div class="image text-center bg-light">
            <img :src="workout.exercises[0].image" alt="" v-if="workout.exercises && workout.exercises.length > 0" />

            <font-awesome-icon icon="image" class="fa-3x text-muted" v-else />
          </div>

          <div class="px-3 pt-3 bg-white">
            <h4>
              <router-link :to="{ name: 'Exercises', params: { id: workout._id } }" v-if="workout._id" class="text-capitalize text-secondary">{{ workout.name }}</router-link>
            </h4>

            <p class="text-muted">Week Day: {{ workout.weekDay }}</p>

            <p v-if="workout.exercises && workout.exercises.length == 1" class="text-muted">Quantity: {{ workout.exercises.length }} exercise</p>

            <p v-else-if="workout.exercises && workout.exercises.length > 1" class="text-muted">Quantity: {{ workout.exercises.length }} exercises</p>

            <p v-else class="text-muted">Quantity: 0 exercise</p>
          </div>

          <footer class="p-3 bg-light text-right">
            <button class="btn btn-xs btn-transparent m-0" @click.prevent="deleteWorkout(workout._id)">Remove</button>

            <button class="btn btn-xs btn-light m-0" @click.prevent="updateWorkout(workout)">Edit</button>
          </footer>
        </div>
      </div>

      <workout-update :data-workout-origin="dataWorkoutOrigin" />
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
  }
  })
export default class ListWorkouts extends Vue {
  @Action('setShowModalBackdrop', { namespace: namespaceModal }) private setShowModalBackdrop: any
  @Action('setShowUpdateModal', { namespace: namespaceModal }) private setShowUpdateModal: any

  @Action('setDeleteWorkout', { namespace: namespaceWorkouts }) private setDeleteWorkout: any
  @Getter('listWorkouts', { namespace: namespaceWorkouts }) private listWorkouts: any

  private message: string = ''
  private dataWorkoutOrigin: any = ''
  private quantity: number = 0

  private updateWorkout (workout: any) {
    this.dataWorkoutOrigin = workout

    this.setShowModalBackdrop(true)
    this.setShowUpdateModal(true)
  }

  private deleteWorkout (id: string) {
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
