<template>
  <div class="modal modal-xs fade" v-show="setShowModalBackdrop && showUpdateModal" :class="{ 'show animated fadeInUp': setShowModalBackdrop && showUpdateModal }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="text-secondary text-uppercase">Exercise Information</h2>
        </div>

        <div class="modal-body">
          <div class="exercise-name text-center text-primary">{{ dataExerciseOrigin.name }}</div>

          <div class="exercise-image align-items-center">
            <img :src="dataExerciseOrigin.image" alt="">
          </div>

          <b-card no-body>
            <b-tabs card>
              <b-tab title="Track Log" active>
                <track-log ref="trackLog" />
              </b-tab>

              <b-tab title="History">
                <history ref="history" :exercise-name="dataExerciseOrigin.name" />
              </b-tab>

              <b-tab title="Note">
                <note ref="note" />
              </b-tab>
            </b-tabs>
          </b-card>

          <div class="form-group form-button text-center mb-0">
            <button class="btn btn-sm btn-primary" @click.prevent="updateExercise(dataExerciseOrigin._id)">
              Update
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
import history from './components/history.vue'
import note from './components/note.vue'

interface SetType {
  weight?: number;
  reps?: number;
}

interface HistoryType {
  sets?: Array<SetType>;
}

interface ParamsExerciseHistory {
  history?: HistoryType;
  'exercise_id': string;
}

interface ParamsExerciseNote {
  text?: string;
  'exercise_id': string;
}

const namespaceModal: string = 'modal'
const namespaceExercise: string = 'exercises'

@Component({
  components: {
  FontAwesomeIcon,
  trackLog,
  history,
  note
  },
  })
export default class ExerciseUpdate extends Vue {
  @Prop() dataExerciseOrigin!: any

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

  updateExercise (id: string) {
    const setNumber: Array<SetType> = this.$refs.trackLog.setNumber
    const noteContent: string = this.$refs.note.noteContent

    const sets: HistoryType = {
      sets: setNumber
    }

    const Historyparams: ParamsExerciseHistory = {
      history: sets,
      'exercise_id': id
    }

    const Noteparams: ParamsExerciseNote = {
      text: noteContent,
      'exercise_id': id
    }

    axios
      .post(config.domainAddress + config.api.history, Historyparams)
      .then(function (response: Response) {
        this.loading = false

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

        this.setShowModalBackdrop(false)
        this.setShowUpdateModal(false)

        this.$toasted.success('Update Successfully!!!')
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errContent = error.response.data.message
        } else {
          this.$toasted.error('Error happened!!!')
        }

        this.loading = false
      }.bind(this))

    if (this.$refs.note.noteContent) {
      axios
        .post(config.domainAddress + config.api.note, Noteparams)
        .then(function (response: Response) {
          this.loading = false

          this.$refs.note.noteContent = ''

          this.setShowModalBackdrop(false)
          this.setShowUpdateModal(false)
        }.bind(this))
        .catch(function (error: Response) {
          if (error.response && error.response.data && error.response.data.message) {
            this.errContent = error.response.data.message
          } else {
            this.$toasted.error('Error happened!!!')
          }

          this.loading = false
        }.bind(this))
    }
  }

  closeModal () {
    this.setShowModalBackdrop(false)
    this.setShowUpdateModal(false)
  }
}
</script>
