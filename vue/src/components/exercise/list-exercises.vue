<template>
  <div class="container">
    <div class="row">
      <div class="col-2" v-for="(exercise, index) in listExercises" :key="index">
        <div class="list-cards list-cards-small text-left">
          <div class="card border">
            <b-dropdown :id="'drop-down-component' + index" variant="link">
              <template slot="button-content">
                <font-awesome-icon icon="caret-down" />
              </template>

              <b-dropdown-item-button @click.prevent="deleteExercise(exercise._id)">Remove</b-dropdown-item-button>
            </b-dropdown>

            <div class="image bg-light p-2">
              <img :src="exercise.image" alt="">
            </div>

            <div class="body px-3 py-2">
              <h6 class="card-title mb-0">{{ exercise.name }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
      <a href="#" class="btn btn-lg btn-primary" @click.prevent="startLog">Start Workout</a>
    </div>

    <exercise-log :list-exercises="listExercises" :workout-name="workoutName" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import config from '@/config'
import { Response, ID } from '@/util'

import exerciseLog from './exercise-log.vue'

const namespaceModal: string = 'modal'
const namespaceExercises: string = 'exercises'

@Component({
  components: {
  exerciseLog,
  FontAwesomeIcon
  },
  })
export default class ListExercises extends Vue {
  @Prop() workoutName!: string
  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any
  @Action('setShowUpdateModal', { namespace: namespaceModal }) setShowUpdateModal: any

  @Action('setDeleteExercise', { namespace: namespaceExercises }) setDeleteExercise: any
  @Getter('listExercises', { namespace: namespaceExercises }) listExercises: any

  message: string = ''

  startLog () {
    this.setShowModalBackdrop(true)
    this.setShowUpdateModal(true)
  }

  deleteExercise (id: string) {
    this.setDeleteExercise(id)

    axios
      .delete(config.api.exercise + id)
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
