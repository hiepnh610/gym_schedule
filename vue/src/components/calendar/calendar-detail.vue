<template>
  <div class="row justify-content-center">
    <div class="col-12">
      <div class="list-group style-custom" v-if="listExercises.length > 0">
        <div class="list-group-item" v-for="(exercise, index) in listExercises" :key="index">
          <img :src="exercise.image" alt="">

          <h5 class="mb-2">{{ exercise.name }}</h5>

          <p><small class="text-muted" v-if="exercise.note"><strong>Note:</strong> {{ exercise.note }}</small></p>

          <div class="row">
            <div class="col-3 mb-2 text-muted" v-for="(log, index) in exercise.track_log" :key="index">
              <small>
                <strong>Set {{ index + 1 }}: </strong>

                <span>{{ log.weight }} kg</span>

                <span> - </span>

                <span>{{ log.reps }} reps</span>
              </small>
            </div>
          </div>

          <a href="#" class="btn btn-sm btn-warning mr-1 ml-0" @click.prevent="updateHistory(exercise)">Update</a>

          <a href="#" class="btn btn-sm btn-danger" @click.prevent="deleteHistory(exercise._id)">Remove</a>
        </div>
      </div>

      <p class="text-center" v-else>You haven't add any logs.</p>
    </div>

    <calendar-update :data-history-origin="dataHistoryOrigin" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import moment from 'moment'

import axios from 'axios'

import config from '@/config'
import { Response, ID, setLoading } from '@/util'

import calendarUpdate from './calendar-update.vue'

const namespaceCalendar: string = 'calendar'
const namespaceModal: string = 'modal'

interface DateParam {
  date: string;
}

interface TrackLog {
  reps: number;
  weight: number;
}

interface DataHistoryOrigin {
  _id?: string;
  image?: string;
  name?: string;
  note?: string;
  'track_log'?: Array<TrackLog>;
}

@Component({
  components: {
  FontAwesomeIcon,
  calendarUpdate,
  },
  })
export default class CalendarDetail extends Vue {
  @Prop() date!: string

  @Action('setCalendarTitle', { namespace: namespaceCalendar }) setCalendarTitle: any

  @Action('setListExercises', { namespace: namespaceCalendar }) setListExercises: any
  @Action('setDeleteExercise', { namespace: namespaceCalendar }) setDeleteExercise: any
  @Getter('listExercises', { namespace: namespaceCalendar }) listExercises: any

  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any
  @Action('setShowUpdateModal', { namespace: namespaceModal }) setShowUpdateModal: any
  @Getter('showUpdateModal', { namespace: namespaceModal }) showUpdateModal: any

  dataHistoryOrigin: DataHistoryOrigin = {}

  created () {
    const convertDate: any = moment(new Date(this.date)).format('MM-DD-YYYY')
    const params: DateParam = {
      date: convertDate
    }

    this.setCalendarTitle(this.date)

    axios
      .get(config.api.calendarDetail, { params })
      .then(function (response: Response) {
        this.setListExercises(response.data)
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }
      }.bind(this))
  }

  deleteHistory (id: String) {
    axios
      .delete(config.api.calendarDetail + id)
      .then(function () {
        this.setDeleteExercise(id)
        this.$toasted.success('Delete Successfully!!!')
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }

        this.$toasted.error('Error happened!!!')
      }.bind(this))
  }

  updateHistory (history: any) {
    this.dataHistoryOrigin = history

    this.setShowModalBackdrop(true)
    this.setShowUpdateModal(true)
  }
}
</script>
