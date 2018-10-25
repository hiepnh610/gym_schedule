<template>
  <div class="modal modal-xs fade" v-show="setShowModalBackdrop && showUpdateModal" :class="{ 'show animated fadeInUp': setShowModalBackdrop && showUpdateModal }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="text-secondary text-uppercase">Exercise Information</h2>
        </div>

        <div class="modal-body">
          <div class="exercise-name text-center">{{ dataExerciseOrigin.name }}</div>

          <div class="exercise-image align-items-center">
            <img :src="dataExerciseOrigin.image" alt="">
          </div>

          <b-card no-body>
            <b-tabs card>
              <b-tab title="Track Log">
                <track-log />
              </b-tab>

              <b-tab title="History" active>
                <history :exercise-name="dataExerciseOrigin.name" />
              </b-tab>
            </b-tabs>
          </b-card>

          <div class="form-group form-button text-center mb-0">
            <button class="btn btn-sm btn-primary">
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

const namespaceModal: string = 'modal'

@Component({
  components: {
  FontAwesomeIcon,
  trackLog,
  history
  },
  })
export default class ExerciseUpdate extends Vue {
  @Prop() dataExerciseOrigin!: any

  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any
  @Action('setShowUpdateModal', { namespace: namespaceModal }) setShowUpdateModal: any
  @Getter('showUpdateModal', { namespace: namespaceModal }) showUpdateModal: any

  loading: boolean = false

  closeModal () {
    this.setShowModalBackdrop(false)
    this.setShowUpdateModal(false)
  }
}
</script>
