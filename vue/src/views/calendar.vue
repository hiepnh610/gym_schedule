<template>
  <div id="calendar-page" v-if="!isLoading">
    <div class="page-title mb-5">
      <div class="container">
        <h2 class="text-center mb-5" v-if="calendarTitle">{{ convertDate | date_with_comma }}</h2>

        <h2 class="text-center mb-5" v-else>Calendar</h2>
      </div>
    </div>

    <div class="container">
      <router-view></router-view>
    </div>
  </div>

  <loading v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

import { setLoading } from '@/util'

import Loading from '@/components/loading/loading.vue'

const namespaceCalendar: string = 'calendar'

@Component({
  components: {
  Loading,
  }
  })
export default class Calendar extends Vue {
  @Getter('calendarTitle', { namespace: namespaceCalendar }) calendarTitle: any

  convertDate!: Date
  isLoading: boolean = true

  created () {
    const _this: any = this
    const isAuthenticated: boolean = _this.$session.exists()
    const isCalendarPage = window.location.href === (window.location.origin + '/calendar') || window.location.href === (window.location.origin + '/calendar/')

    if (isAuthenticated) {
      if (isCalendarPage) {
        this.$router.push('/calendar/full')
      }
    }

    if (this.calendarTitle) {
      this.convertDate = new Date(this.calendarTitle)
    }
  }

  mounted () {
    setLoading(this, false)
  }

  @Watch('calendarTitle', { immediate: true, deep: true })
  dataCalendar (val: any, oldVal: any) {
    this.convertDate = new Date(val)
  }
}
</script>
