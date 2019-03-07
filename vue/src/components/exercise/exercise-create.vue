<template>
  <div class="modal modal-xs fade text-left" v-show="setShowModalBackdrop && showCreateModal" :class="{ 'show animated fadeInUp': setShowModalBackdrop && showCreateModal }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title text-primary text-uppercase">Exercises</h2>
        </div>

        <div class="modal-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="(exercise, index) in exercises" :key="index" @click="exerciseCreated(exercise)">
              <div class="d-flex">
                <img :src="exercise.image" class="img-thumbnail" />

                <div class="d-flex align-items-center">{{ exercise.name }}</div>
              </div>
            </li>
          </ul>

          <div class="form-group form-button text-right mb-0">
            <button class="btn btn-xs btn-secondary" @click.prevent="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'
import ListExercises from './exercises.json'

const namespaceModal: string = 'modal'
const namespaceExercise: string = 'exercises'

interface ExerciseType {
  [propName: string]: string
}

interface ParamsExerciseCreate {
  'workout_id': string
  image: string
  name: string
}

interface DataItem {
  _id: string
  image: string
  name: string
}

@Component
export default class ExerciseCreate extends Vue {
  @Action('setShowModalBackdrop', { namespace: namespaceModal }) private setShowModalBackdrop: any
  @Action('setShowCreateModal', { namespace: namespaceModal }) private setShowCreateModal: any
  @Getter('showModalBackdrop', { namespace: namespaceModal }) private showModalBackdrop: any
  @Getter('showCreateModal', { namespace: namespaceModal }) private showCreateModal: any

  @Action('setCreateExercise', { namespace: namespaceExercise }) private setCreateExercise: any
  @Action('setListExercises', { namespace: namespaceExercise }) private setListExercises: any

  private exercises: ExerciseType = ListExercises
  private message: string = ''

  private closeModal () {
    this.setShowModalBackdrop(false)
    this.setShowCreateModal(false)
  }

  private exerciseCreated (exercise: any) {
    if (!exercise.name) {
      this.message = 'The exercise name cannot be blank.'

      return
    }

    if (!exercise.image) {
      this.message = 'The image cannot be blank.'

      return
    }

    const params: ParamsExerciseCreate = {
      name: exercise.name,
      image: exercise.image,
      workout_id: this.$route.params.id
    }

    axios
      .post(config.api.exercise, params)
      .then(function (response: Response) {
        const dataItem: DataItem = {
          _id: response.data._id,
          image: response.data.image,
          name: response.data.name
        }

        this.setCreateExercise(dataItem)

        this.$toasted.success('Create Successfully!!!')
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.$toasted.error('Error happened!!!')
        }
      }.bind(this))
  }
}
</script>
