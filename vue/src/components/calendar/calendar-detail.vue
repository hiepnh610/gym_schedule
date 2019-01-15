<template>
  <div class="row justify-content-center">
    <div class="col-12">
      <div v-if="listActivities.length > 0">
        <div v-for="(activity, index) in listActivities" :key="index">
          <b-dropdown :id="'drop-down-component' + index" variant="link" class="mb-3">
            <template slot="button-content">
              {{ activity['workout_name'] }}
              <font-awesome-icon icon="caret-down" class="ml-1" />
            </template>

            <b-dropdown-item-button @click.prevent="removeActivity(activity['_id'])">Remove</b-dropdown-item-button>
          </b-dropdown>

          <div class="row">
            <div v-for="(exercise, index) in activity.exercises" :key="index" class="col-12 col-md-4">
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
  date: string;
}

@Component({
  components: {
  FontAwesomeIcon,
  },
  })
export default class CalendarDetail extends Vue {
  @Prop() date!: string

  @Action('setCalendarTitle', { namespace: namespaceCalendar }) setCalendarTitle: any

  @Action('setListActivities', { namespace: namespaceActivities }) setListActivities: any
  @Action('setDeleteActivity', { namespace: namespaceActivities }) setDeleteActivity: any
  @Getter('listActivities', { namespace: namespaceActivities }) listActivities: any

  created () {
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

  removeActivity (id: string) {
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
