<template>
  <div class="text-center mb-5">
    <full-calendar :events="activitiesData" locale="en" firstDay="1" @dayClick="dayClick"></full-calendar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import FullCalendar from 'vue-fullcalendar'
import moment from 'moment'

import axios from 'axios'

import config from '@/config'
import { Response, ID, setLoading } from '@/util'

import Loading from '@/components/loading/loading.vue'

interface ActivitiesDataType {
  start: string
}

const namespaceCalendar: string = 'calendar'

@Component({
  components: {
  FontAwesomeIcon,
  Loading,
  FullCalendar
  }
  })
export default class AllCalendar extends Vue {
  @Action('setCalendarTitle', { namespace: namespaceCalendar }) private setCalendarTitle: any

  private isLoading: boolean = true
  private activitiesData: ActivitiesDataType[] = []

  private created () {
    this.setCalendarTitle('')

    axios
      .get(config.api.activities)
      .then(function (response: Response) {
        this.activitiesData = this.createNewData(response.data)
        setLoading(this, false)
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }
      }.bind(this))
  }

  private createNewData (data: any) {
    const newActivities: ActivitiesDataType[] = []

    for (const item of data) {
      newActivities.push({ start: item })
    }

    return newActivities
  }

  private dayClick (date: any, jsEvent: any) {
    const dateSelected: string = moment(date).format('MM-DD-YYYY')

    this.$router.push({
      path: `detail/${dateSelected}`
    })
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/elements/calendar/_calendar.scss";
</style>
