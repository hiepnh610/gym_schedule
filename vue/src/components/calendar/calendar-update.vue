<template>
  <div class="modal modal-xs fade" v-show="setShowModalBackdrop && showUpdateModal" :class="{ 'show animated fadeInUp': setShowModalBackdrop && showUpdateModal }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="text-secondary text-uppercase">Hisroty Information</h2>
        </div>

        <div class="modal-body">
          <div class="text-center text-primary py-2">{{ dataHistoryOrigin.name }}</div>

          <div class="track-log text-center">
            <div class="track-log-content">
              <table class="table mb-0">
                <thead class="thead-light">
                  <tr>
                    <th class="text-nowrap">{{ setNumber.length }} sets</th>
                    <th>Weight</th>
                    <th>Reps</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(set, index) in setNumber" :key="index">
                    <td>{{ index + 1 }}</td>

                    <td>
                      <input type="text" class="form-control" v-model.number="set.weight">
                    </td>

                    <td>
                      <input type="text" class="form-control" v-model.number="set.reps">
                    </td>

                    <td>
                      <font-awesome-icon icon="times-circle" class="text-danger cursor-pointer" @click="removeSet(index)" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="track-log-footer pt-0 mb-1">
              <div class="row justify-content-between align-items-center">
                <div class="col-12 col-md-4">
                  <a href="#" @click.prevent="addMoreSet">
                    Add more set

                    <font-awesome-icon icon="plus-circle" class="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-light small text-light-gray px-3 py-2 mb-3">
            <font-awesome-icon icon="sticky-note" class="mr-2" />

            <span>Note</span>
          </div>

          <div class="col-12">
            <textarea-autosize
            class="form-control mb-3"
            :min-height="60"
            :max-height="300"
            v-model="note" />
          </div>

          <div class="form-group form-button text-center mb-0">
            <button class="btn btn-sm btn-primary" @click.prevent="updateHistory(dataHistoryOrigin._id)">
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
import { Response, ID, setLoading } from '@/util'

interface TypeTrackLog {
  reps: number;
  weight: number;
}

interface TypeUpdateParams {
  'track_log': Array<TypeTrackLog>;
  note: string;
}

const namespaceCalendar: string = 'calendar'
const namespaceModal: string = 'modal'

@Component({
  components: {
  FontAwesomeIcon,
  },
  })
export default class CalendarUpdate extends Vue {
  @Prop() dataHistoryOrigin!: any

  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any
  @Action('setShowUpdateModal', { namespace: namespaceModal }) setShowUpdateModal: any
  @Getter('showUpdateModal', { namespace: namespaceModal }) showUpdateModal: any

  @Action('setUpdateExercise', { namespace: namespaceCalendar }) setUpdateExercise: any

  loading: boolean = false
  setNumber: Array<TypeTrackLog> = []
  note: string = ''

  addMoreSet () {
    this.setNumber.push({
      weight: 0,
      reps: 0
    })
  }

  removeSet (index: number) {
    this.setNumber.splice(index, 1)
  }

  closeModal () {
    this.setShowModalBackdrop(false)
    this.setShowUpdateModal(false)
  }

  updateHistory (id: string) {
    const params: TypeUpdateParams = {
      'track_log': this.setNumber,
      note: this.note
    }

    this.loading = true

    // axios
    //   .put(config.api.calendarDetail + id, params)
    //   .then(function (response: Response) {
    //     this.loading = false

    //     this.setShowModalBackdrop(false)
    //     this.setShowUpdateModal(false)

    //     this.setUpdateExercise(response.data)

    //     this.$toasted.success('Delete Successfully!!!')
    //   }.bind(this))
    //   .catch(function (error: Response) {
    //     if (error.response && error.response.data && error.response.data.message) {
    //       this.message = error.response.data.message
    //     } else {
    //       this.message = 'Error happened.'
    //     }

    //     this.$toasted.error('Error happened!!!')
    //   }.bind(this))
  }

  @Watch('dataHistoryOrigin', { immediate: true, deep: true })
  dataHistory (val: any, oldVal: any) {
    this.note = val.note || ''

    // val.track_log is reactiveGetter
    // I can't mutation the value from outside vuex
    // I need to create new array from origin data
    if (val.track_log) {
      this.setNumber = val.track_log.map((set: any) => {
        return {
          reps: set.reps,
          weight: set.weight
        }
      })
    } else {
      this.setNumber = [
        {
          weight: 0,
          reps: 0
        },
        {
          weight: 0,
          reps: 0
        }
      ]
    }
  }
}
</script>
