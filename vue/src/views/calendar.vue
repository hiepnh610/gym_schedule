<template>
  <div id="calendar-page" v-if="!isLoading">
    <div class="page-title">
      <div class="container">
        <h2 class="text-center mb-5">Calendar</h2>
      </div>
    </div>

    <div class="container">
      <div class="text-center mb-5">
        <full-calendar :events="activitiesData" locale="en" firstDay="1" @dayClick="dayClick"></full-calendar>
      </div>
    </div>
  </div>

  <loading v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import FullCalendar from 'vue-fullcalendar'

import axios from 'axios'

import config from '@/config'
import { Response, ID, setLoading } from '@/util'

import Loading from '@/components/loading/loading.vue'

interface activitiesDataType {
  start: String;
}

@Component({
  components: {
  FontAwesomeIcon,
  Loading,
  FullCalendar,
  },
  })
export default class Calendar extends Vue {
  isLoading: boolean = true
  activitiesData: Array<activitiesDataType> = []

  created () {
    axios
      .get(config.domainAddress + config.api.calendar)
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

  createNewData (data: any) {
    let newActivities: Array<activitiesDataType> = []

    for (let item in data) {
      newActivities.push({ start: item })
    }

    return newActivities
  }

  dayClick (day: any, jsEvent: any) {
    console.log(day)
    console.log(jsEvent)
  }
}
</script>
