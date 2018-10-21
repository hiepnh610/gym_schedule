<template>
  <div class="modal modal-xs fade text-left" v-show="setShowModalBackdrop && showCreateModal" :class="{ 'show animated fadeInUp': setShowModalBackdrop && showCreateModal }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="text-secondary text-uppercase">Exercises</h2>
        </div>

        <div class="modal-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="(exercise, index) in exercises" :key="index">
              <div class="d-flex" @click.prevent="exerciseCreate(exercise)">
                <img :src="exercise.image" class="img-thumbnail" />

                <div class="d-flex align-items-center">{{ exercise.name }}</div>
              </div>
            </li>
          </ul>

          <div class="form-group form-button text-center mb-0">
            <button class="btn btn-sm btn-secondary" @click.prevent="closeModal">Close</button>
          </div>
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
import ListExercises from './exercises.json'

const namespaceModal: string = 'modal'
const namespaceExercise: string = 'exercises'

interface ExerciseType {
  [propName: string]: string
}

@Component({
  components: {
  FontAwesomeIcon
  },
  })
export default class ExerciseCreate extends Vue {
  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any
  @Action('setShowCreateModal', { namespace: namespaceModal }) setShowCreateModal: any
  @Getter('showModalBackdrop', { namespace: namespaceModal }) showModalBackdrop: any
  @Getter('showCreateModal', { namespace: namespaceModal }) showCreateModal: any

  @Action('setCreateWorkout', { namespace: namespaceExercise }) setCreateWorkout: any
  @Action('setListExercises', { namespace: namespaceExercise }) setListExercises: any

  exercises: ExerciseType = ListExercises
  message: string = ''
  loading: boolean = false

  closeModal () {
    this.setShowModalBackdrop(false)
    this.setShowCreateModal(false)
  }

  exerciseCreate (exercise: any) {
  }
}
</script>
