<template>
  <div class="modal fade text-left" v-show="setShowModalBackdrop && showCreateModal" :class="{ 'show animated bounceIn': setShowModalBackdrop && showCreateModal }" :style="{ display: 'block' }">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-body">
          <h2 class="text-center text-success">Exercises</h2>

          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="(exercise, index) in exercises" :key="index">
              <div class="d-flex" @click.prevent="exerciseCreate(exercise)">
                <img :src="exercise.image" class="rounded-0 img-thumbnail" />

                <div class="body">{{ exercise.name }}</div>
              </div>
            </li>
          </ul>

          <div class="form-group text-center mb-0 aligh-center">
            <button href="dashboard" class="btn btn-md btn-secondary" @click.prevent="closeModal">Close</button>
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

interface ParamsExercisesCreate {
  history: string;
  image: string;
  name: string;
  sets: string[];
  track_note: string;
  workout_id: any;
}

@Component
export default class ExerciseCreate extends Vue {
  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any
  @Action('setShowCreateModal', { namespace: namespaceModal }) setShowCreateModal: any
  @Getter('showModalBackdrop', { namespace: namespaceModal }) showModalBackdrop: any
  @Getter('showCreateModal', { namespace: namespaceModal }) showCreateModal: any

  @Action('setCreateWorkout', { namespace: namespaceExercise }) setCreateWorkout: any
  @Action('setListExercises', { namespace: namespaceExercise }) setListExercises: any

  exercises: ExerciseType = ListExercises
  message: string = ''

  closeModal () {
    this.setShowModalBackdrop(false)
    this.setShowCreateModal(false)
  }

  exerciseCreate (exercise: any) {
    if (!exercise.name) {
      this.message = 'The exercise name cannot be blank.'

      return
    }

    if (!exercise.image) {
      this.message = 'The exercise image cannot be blank.'

      return
    }

    const params: ParamsExercisesCreate = {
      history: exercise.history || '',
      image: exercise.image,
      name: exercise.name,
      sets: exercise.sets || [],
      track_note: exercise.track_note || '',
      workout_id: this.$route.params.id
    }

    axios
      .post(config.domainAddress + config.api.exercise, params)
      .then(function (response: Response) {
        this.setListExercises(response.data)

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

<style lang="scss" scoped>
  @import '../../assets/scss/variables.scss';
  @import '../../assets/scss/mixins.scss';

  .list-group {
    max-height: 60vh;
    margin-bottom: $size-base;
    overflow-x: hidden;
    overflow-y: scroll;

    .list-group-item {
      cursor: pointer;
      padding-left: 0;
      padding-right: 0;

      .d-flex {
        align-items: center;
      }

      img {
        margin-right: $size-base;
        max-width: $size-base * 5;
      }
    }
  }
</style>
