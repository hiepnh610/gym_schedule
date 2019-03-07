<template>
  <div class="row justify-content-center">
    <div class="col-12">
      <div v-if="listActivities.length > 0">
        <div v-for="(activity, index) in listActivities" :key="index">
          <div class="bg-light px-4 py-3 mb-4 clearfix">
            <strong>{{ activity['workout_name'] }}</strong>

            <a href="#" class="text-primary float-right" @click.prevent="removeActivity(activity['_id'])">
              <small>Remove</small>
            </a>
          </div>

          <div class="row">
            <div v-for="(exercise, index) in activity.exercises" :key="index" class="col-12 col-md-6">
              <div class="list-cards list-cards-horizontal text-left">
                <div class="card border">
                  <div class="image bg-light p-2">
                    <img :src="exercise.exercise_image" alt="">
                  </div>

                  <h6 class="card-title mb-0">{{ exercise.exercise_name }}</h6>

                  <p class="text-muted mb-0" v-for="(log, index) in exercise.exercise_log" :key="index">
                    <small>Set {{ index + 1 }}: {{ log.weight }} kg - {{ log.reps }} reps</small>
                  </p>

                  <p class="mb-0" v-if="exercise.exercise_note">
                    <small>Note: {{ exercise.exercise_note }}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="text-center" v-else>You haven't add any logs.</p>
    </div>
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

const namespaceCalendar: string = 'calendar'
const namespaceModal: string = 'modal'
const namespaceActivities: string = 'activities'

interface DateParam {
  date: string
}

@Component({
  components: {
  FontAwesomeIcon
  }
  })
export default class CalendarDetail extends Vue {
  @Prop() private date!: string

  @Action('setCalendarTitle', { namespace: namespaceCalendar }) private setCalendarTitle: any

  @Action('setListActivities', { namespace: namespaceActivities }) private setListActivities: any
  @Action('setDeleteActivity', { namespace: namespaceActivities }) private setDeleteActivity: any
  @Getter('listActivities', { namespace: namespaceActivities }) private listActivities: any

  private created () {
    const convertDate: any = moment(new Date(this.date)).format('MM-DD-YYYY')
    const params: DateParam = {
      date: convertDate
    }

    this.setCalendarTitle(this.date)

    axios
      .get(config.api.activityDetail, { params })
      .then(function (response: Response) {
        this.setListActivities(response.data)
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }
      }.bind(this))
  }

  private removeActivity (id: string) {
    axios
      .delete(config.api.activities + id)
      .then(function () {
        this.setDeleteActivity(id)

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
