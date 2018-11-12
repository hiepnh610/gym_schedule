<template>
  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore voluptas sint exercitationem, iure impedit, cupiditate, hic ipsum excepturi aliquam magnam optio id officiis numquam possimus libero at beatae ipsam praesentium.</p>
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

  created () {
    const convertDate: any = moment(new Date(this.date)).format('DD-MM-YYYY')
    const params: DateParam = {
      date: convertDate
    }

    this.setCalendarTitle(this.date)

    axios
      .get(config.domainAddress + config.api.calendarDetail, { params })
      .then(function (response: Response) {})
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }
      }.bind(this))
  }
}
</script>
