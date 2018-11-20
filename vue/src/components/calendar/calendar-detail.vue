<template>
  <div class="row justify-content-center">
    <div class="col-12">
      <div class="list-group style-custom">
        <div class="list-group-item" v-for="(exercise, index) in listExercises" :key="index">
          <img :src="exercise.image" alt="">

          <h5 class="mb-2">{{ exercise.name }}</h5>

          <small class="text-muted mb-1" v-if="exercise.note"><strong>Note:</strong> {{ exercise.note.text }}</small>

          <div class="row" v-for="(history, index) in exercise.histories" :key="index">
            <div class="col-3 mb-2 text-muted" v-for="(set, index) in history.sets" :key="index">
              <small>
                <strong>Set {{ index + 1 }}: </strong>

                <span>{{ set.weight }} kg</span>

                <span> - </span>

                <span>{{ set.reps }} reps</span>
              </small>
            </div>
          </div>

          <a href="#" class="btn btn-sm btn-warning mr-1">Update</a>

          <a href="#" class="btn btn-sm btn-danger" @click.prevent="deleteActivity(exercise._id)">Remove</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import moment from 'moment'

import axios from 'axios'

import config from '@/config'
import { Response, ID, setLoading } from '@/util'

const namespaceCalendar: string = 'calendar'

interface DateParam {
  date: string;
}

@Component
export default class CalendarDetail extends Vue {
  @Prop() date!: string

  @Action('setCalendarTitle', { namespace: namespaceCalendar }) setCalendarTitle: any

  @Action('setListExercises', { namespace: namespaceCalendar }) setListExercises: any
  @Action('setDeleteExercise', { namespace: namespaceCalendar }) setDeleteExercise: any
  @Getter('listExercises', { namespace: namespaceCalendar }) listExercises: any

  created () {
    const convertDate: any = moment(new Date(this.date)).format('MM-DD-YYYY')
    const params: DateParam = {
      date: convertDate
    }

    this.setCalendarTitle(this.date)

    axios
      .get(config.domainAddress + config.api.calendarDetail, { params })
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

  deleteActivity (id: String) {
    const convertDate: any = moment(new Date(this.date)).format('MM-DD-YYYY')

    const params: any = {
      date: convertDate
    }

    axios
      .delete(config.domainAddress + config.api.calendarDetail + id, { params })
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
}
</script>
