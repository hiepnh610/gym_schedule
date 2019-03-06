<template>
  <div class="modal modal-xs fade text-center" v-show="setShowModalBackdrop && showUpdateModal" :class="{ 'show animated fadeInUp': setShowModalBackdrop && showUpdateModal }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title text-primary text-uppercase">Exercise Information</h2>
        </div>

        <div class="modal-body">
          <div class="exercise-name text-center text-secondary">{{ listExercisesToRender.name }}</div>

          <div class="exercise-image align-items-center">
            <img :src="listExercisesToRender.image" alt="">
          </div>

          <track-log ref="trackLog" />

          <note ref="note" />

          <div class="form-group form-button text-right mb-0">
            <button class="btn btn-xs btn-transparent m-0" @click.prevent="closeModal">Cancel</button>

            <button class="btn btn-xs btn-secondary m-0" @click.prevent="exerciseFinish" v-if="!isFinishLog">
              Save
            </button>

            <button class="btn btn-xs btn-secondary m-0" @click.prevent="logFinish" v-if="isFinishLog">
              Finish
              <font-awesome-icon icon="spinner" spin v-if="loading" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

import trackLog from './components/track-log.vue'
import note from './components/note.vue'

interface SetType {
  reps?: number
  weight?: number
}

interface Exercise {
  'exercise_id'?: string
  'exercise_log'?: SetType[]
  'exercise_image'?: string
  'exercise_name'?: string
  'exercise_note'?: string
}

interface dataActivity {
  'created_by'?: string
  'workout_name'?: string
  exercises: Exercise[]
  likes?: string[]
}

interface ListExercisesToRender {
  image: string
  name: string
  _id: string
  note: string
}

const namespaceModal: string = 'modal'
const namespaceExercise: string = 'exercises'

@Component({
  components: {
  FontAwesomeIcon,
  trackLog,
  note
  }
  })
export default class ExerciseUpdate extends Vue {
  @Prop() private listExercises!: any
  @Prop() private workoutName!: string

  @Action('setShowModalBackdrop', { namespace: namespaceModal }) private setShowModalBackdrop: any
  @Action('setShowUpdateModal', { namespace: namespaceModal }) private setShowUpdateModal: any
  @Getter('showUpdateModal', { namespace: namespaceModal }) private showUpdateModal: any

  @Action('setUpdateExercise', { namespace: namespaceExercise }) private setUpdateExercise: any

  private loading: boolean = false
  private listExercisesToRender: ListExercisesToRender = this.listExercises[0]
  private isFinishLog: boolean = false
  private dataActivity: dataActivity = {
    exercises: [],
    workout_name: this.workoutName
  }

  $refs!: {
    trackLog: HTMLFormElement,
    history: HTMLFormElement,
    note: HTMLFormElement
  }

  private exerciseFinish () {
    const indexItem: number = this.listExercises.indexOf(this.listExercisesToRender)
    const setNumber: SetType[] = this.$refs.trackLog.setNumber
    const noteContent: string = this.$refs.note.noteContent
    const self: any = this
    const usernameFromUrl: string = window.location.pathname.replace('/profile/', '').replace('/', '')

    const exerciseLog: Exercise = {
      exercise_id: this.listExercisesToRender._id,
      exercise_log: setNumber,
      exercise_image: this.listExercisesToRender.image,
      exercise_name: this.listExercisesToRender.name
    }

    if (noteContent) {
      exerciseLog.exercise_note = noteContent
    }

    this.dataActivity.exercises.push(exerciseLog)
    this.dataActivity.created_by = self.$session.get('username')

    if (indexItem < this.listExercises.length - 1) {
      const nextIndexItem: number = indexItem + 1

      this.listExercisesToRender = this.listExercises[nextIndexItem]

      this.$refs.note.noteContent = ''
      this.$refs.trackLog.setNumber = [
        {
          weight: 0,
          reps: 0
        },
        {
          weight: 0,
          reps: 0
        }
      ]
    } else {
      this.isFinishLog = true
    }
  }

  private logFinish () {
    const params: dataActivity = this.dataActivity

    axios
      .post(config.api.activities, params)
      .then(function (response: Response) {
        this.setShowModalBackdrop(false)
        this.setShowUpdateModal(false)

        this.isFinishLog = false
        this.$refs.note.noteContent = ''
        this.$refs.trackLog.setNumber = [
          {
            weight: 0,
            reps: 0
          },
          {
            weight: 0,
            reps: 0
          }
        ]

        this.$toasted.success(response.data.message)
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.$toasted.error('Error happened!!!')
        }
      }.bind(this))
  }

  private closeModal () {
    this.listExercisesToRender = this.listExercises[0]
    this.isFinishLog = false

    this.setShowModalBackdrop(false)
    this.setShowUpdateModal(false)
  }
}
</script>
