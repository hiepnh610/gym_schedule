<template>
  <div class="modal modal-xs fade text-center" v-show="setShowModalBackdrop && showUpdateModal" :class="{ 'show animated fadeInUp': setShowModalBackdrop && showUpdateModal }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="text-secondary text-uppercase">Exercise Information</h2>
        </div>

        <div class="modal-body">
          <div class="exercise-name text-center text-primary">{{ listExercisesToRender.name }}</div>

          <div class="exercise-image align-items-center">
            <img :src="listExercisesToRender.image" alt="">
          </div>

          <b-card no-body>
            <b-tabs card>
              <b-tab title="Track Log" active>
                <track-log ref="trackLog" />
              </b-tab>

              <b-tab title="Note">
                <note ref="note" />
              </b-tab>
            </b-tabs>
          </b-card>

          <div class="form-group form-button text-center mb-0">
            <button class="btn btn-sm btn-primary" @click.prevent="exerciseFinish" v-if="!isFinishLog">
              Save
            </button>

            <button class="btn btn-sm btn-primary" @click.prevent="logFinish" v-if="isFinishLog">
              Finish
              <font-awesome-icon icon="spinner" spin v-if="loading" />
            </button>

            <button class="btn btn-sm btn-secondary" @click.prevent="closeModal">Cancel</button>
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
  reps?: number;
  weight?: number;
}

interface Exercise {
  'exercise_id'?: string;
  'exercise_log'?: Array<SetType>;
  'exercise_image'?: string;
  'exercise_name'?: string;
  'exercise_note'?: string;
}

interface dataActivity {
  'created_by'?: string;
  'workout_name'?: string;
  exercises: Array<Exercise>;
  likes?: string[];
}

interface ListExercisesToRender {
  image: string;
  name: string;
  _id: string;
  note: string;
}

const namespaceModal: string = 'modal'
const namespaceExercise: string = 'exercises'

@Component({
  components: {
  FontAwesomeIcon,
  trackLog,
  note
  },
  })
export default class ExerciseUpdate extends Vue {
  @Prop() listExercises!: any
  @Prop() workoutName!: string

  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any
  @Action('setShowUpdateModal', { namespace: namespaceModal }) setShowUpdateModal: any
  @Getter('showUpdateModal', { namespace: namespaceModal }) showUpdateModal: any

  @Action('setUpdateExercise', { namespace: namespaceExercise }) setUpdateExercise: any

  $refs!: {
    trackLog: HTMLFormElement,
    history: HTMLFormElement,
    note: HTMLFormElement
  }

  loading: boolean = false
  listExercisesToRender: ListExercisesToRender = this.listExercises[0]
  isFinishLog: boolean = false
  dataActivity: dataActivity = {
    exercises: [],
    'workout_name': this.workoutName
  }

  exerciseFinish () {
    const indexItem: number = this.listExercises.indexOf(this.listExercisesToRender)
    const setNumber: Array<SetType> = this.$refs.trackLog.setNumber
    const noteContent: string = this.$refs.note.noteContent
    const _this: any = this

    let exerciseLog: Exercise = {
      'exercise_id': this.listExercisesToRender['_id'],
      'exercise_log': setNumber,
      'exercise_image': this.listExercisesToRender['image'],
      'exercise_name': this.listExercisesToRender['name']
    }

    if (noteContent) {
      exerciseLog['exercise_note'] = noteContent
    }

    this.dataActivity.exercises.push(exerciseLog)
    this.dataActivity.created_by = _this.$session.get('id')

    if (indexItem < this.listExercises.length - 1) {
      let nextIndexItem: number = indexItem + 1

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

  logFinish () {
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

  closeModal () {
    this.listExercisesToRender = this.listExercises[0]
    this.isFinishLog = false

    this.setShowModalBackdrop(false)
    this.setShowUpdateModal(false)
  }
}
</script>
