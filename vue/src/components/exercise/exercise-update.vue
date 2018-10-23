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
              <b-tab title="Track Log" active>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit odit dolore a, mollitia voluptate deserunt culpa aspernatur rem facere, nisi, natus maiores ad aut nam. Laudantium provident fugit quibusdam eius?
              </b-tab>

              <b-tab title="History">
                Impedit odit dolore a, mollitia voluptate deserunt culpa aspernatur rem facere, nisi, natus maiores ad aut nam. Laudantium provident fugit quibusdam eius?
              </b-tab>

              <b-tab title="Note">
                Laudantium provident fugit quibusdam eius?
              </b-tab>
            </b-tabs>
          </b-card>
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

const namespaceModal: string = 'modal'

@Component({
  components: {
  FontAwesomeIcon
  },
  })
export default class ExerciseUpdate extends Vue {
  @Prop() dataExerciseOrigin!: any

  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any
  @Action('setShowUpdateModal', { namespace: namespaceModal }) setShowUpdateModal: any
  @Getter('showUpdateModal', { namespace: namespaceModal }) showUpdateModal: any
}
</script>
