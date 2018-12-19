<template>
  <div id="exercises-page" v-if="!isLoading">
    <div class="text-center">
      <div class="page-title">
        <div class="container">
          <h2 class="text-center mb-5">{{ exerciseName }}</h2>
        </div>
      </div>

      <list-exercises v-if="listExercises.length > 0"></list-exercises>

      <p class="align-center mt-5 mb-5" v-if="listExercises.length === 0">Please add some exercies from the under button.</p>

      <a href="" class="btn btn-lg btn-primary" @click.prevent="createExercise">
        Create Exercise
      </a>

      <exercise-create></exercise-create>
    </div>
  </div>

  <loading v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import axios from 'axios'

import config from '@/config'
import { Response, ID, setLoading } from '@/util'

import exerciseCreate from '@/components/exercise/exercise-create.vue'
import listExercises from '@/components/exercise/list-exercises.vue'
import Loading from '@/components/loading/loading.vue'

const namespaceModal: string = 'modal'
const namespaceExercises: string = 'exercises'

@Component({
  components: {
  exerciseCreate,
  listExercises,
  Loading,
  },
  })
export default class Exercises extends Vue {
  @Prop() id!: string

  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any
  @Action('setShowCreateModal', { namespace: namespaceModal }) setShowCreateModal: any

  @Action('setListExercises', { namespace: namespaceExercises }) setListExercises: any
  @Getter('listExercises', { namespace: namespaceExercises }) listExercises: any

  exerciseName: string = ''
  message: string = ''
  isLoading: boolean = true

  createExercise () {
    this.setShowModalBackdrop(true)
    this.setShowCreateModal(true)
  }

  created () {
    const params: ID = {
      id: this.id
    }

    axios
      .get(config.api.exercise, { params })
      .then(function (response: Response) {
        this.setListExercises(response.data)

        setLoading(this, false)
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }
      }.bind(this))

    axios
      .get(config.api.listWorkout, {
        params: {
          id: this.id
        }
      })
      .then(function (response: Response) {
        this.exerciseName = response.data[0].name
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }
      }.bind(this))
  }
}
</script>
