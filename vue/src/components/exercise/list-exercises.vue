<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <table class="table table-striped text-center mb-5">
          <thead>
            <tr>
              <th>image</th>
              <th>name</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(exercise, index) in listExercises" :key="index">
              <td>
                <div class="image">
                  <img :src="exercise.image" alt="">
                </div>
              </td>

              <td class="text-capitalize">
                {{ exercise.name }}
              </td>

              <td>
                <a href="" class="btn btn-sm btn-warning mr-1" @click.prevent="updateExercise(exercise)">Update</a>

                <a href="" class="btn btn-sm btn-danger" @click.prevent="deleteExercise(exercise._id)">Remove</a>
              </td>
            </tr>
          </tbody>
        </table>

        <exercise-update :data-exercise-origin="dataExerciseOrigin"></exercise-update>
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
import { Response, ID } from '@/util'

import exerciseUpdate from './exercise-update.vue'

const namespaceModal: string = 'modal'
const namespaceExercises: string = 'exercises'
const namespaceTrackLog: string = 'trackLog'
const namespaceNotes: string = 'notes'

@Component({
  components: {
  exerciseUpdate,
  FontAwesomeIcon
  },
  })
export default class ListExercises extends Vue {
  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any
  @Action('setShowUpdateModal', { namespace: namespaceModal }) setShowUpdateModal: any

  @Action('setDeleteExercise', { namespace: namespaceExercises }) setDeleteExercise: any
  @Getter('listExercises', { namespace: namespaceExercises }) listExercises: any

  @Action('setListTrackLog', { namespace: namespaceTrackLog }) setListTrackLog: any

  @Action('setListNotes', { namespace: namespaceNotes }) setListNotes: any

  message: string = ''
  dataExerciseOrigin: any = ''

  updateExercise (exercise: any) {
    const params: ID = {
      id: exercise._id
    }

    axios
      .get(config.api.history, { params })
      .then(function (response: Response) {
        // Create separate data and push to store
        // prevent affect other data when data mutation
        const newListTrackLog = response.data.map((e: any) => {
          return {
            _id: e._id,
            'created_at': e.created_at,
            'track_log': e.track_log,
            'exercise_id': e.exercise_id
          }
        })

        const newListNotes = response.data.map((e: any) => {
          return {
            _id: e._id,
            'created_at': e.created_at,
            'note': e.note,
            'exercise_id': e.exercise_id
          }
        })

        this.setListTrackLog(newListTrackLog)
        this.setListNotes(newListNotes)
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }
      }.bind(this))

    this.dataExerciseOrigin = exercise

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
