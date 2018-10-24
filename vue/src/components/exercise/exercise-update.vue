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
                <div class="track-log">
                  <div class="track-log-header">
                    <div class="row justify-content-between align-items-center">
                      <div class="col-12 col-md-4">
                        <a href="#">
                          Add more set

                          <font-awesome-icon icon="plus-circle" />
                        </a>
                      </div>

                      <div class="col-12 col-md-4">
                        <div class="select-custom">
                          <font-awesome-icon icon="caret-down" />

                          <select class="form-control">
                            <option value="" disabled>Status</option>
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="track-log-content">
                    <table class="table">
                      <thead class="thead-light">
                        <tr>
                          <th>2 sets</th>
                          <th>Weight</th>
                          <th>Reps</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>1</td>

                          <td>
                            <input type="text" class="form-control">
                          </td>

                          <td>
                            <input type="text" class="form-control">
                          </td>

                          <td>
                            <font-awesome-icon icon="times-circle" />
                          </td>
                        </tr>

                        <tr>
                          <td>2</td>

                          <td>
                            <input type="text" class="form-control">
                          </td>

                          <td>
                            <input type="text" class="form-control">
                          </td>

                          <td>
                            <font-awesome-icon icon="times-circle" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div class="form-group form-button text-center mb-0">
                    <button class="btn btn-sm btn-primary">
                      Update
                      <font-awesome-icon icon="spinner" spin v-if="loading" />
                    </button>

                    <button class="btn btn-sm btn-secondary">Cancel</button>
                  </div>
                </div>
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

  loading: boolean = false
}
</script>
