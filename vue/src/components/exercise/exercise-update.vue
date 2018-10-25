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
            <button class="btn btn-sm btn-primary" @click.prevent="updateExercise">
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

const namespaceModal: string = 'modal'

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

  $refs!: {
    trackLog: HTMLFormElement,
    history: HTMLFormElement,
    note: HTMLFormElement
  }

  loading: boolean = false

  updateExercise () {
    console.log(this.$refs.trackLog.setNumber)
    console.log(this.$refs.trackLog.status)
  }

  closeModal () {
    this.setShowModalBackdrop(false)
    this.setShowUpdateModal(false)
  }
}
</script>
