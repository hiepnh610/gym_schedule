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
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import { setLoading } from '@/util'

import Loading from '@/components/loading/loading.vue'

const namespaceCalendar: string = 'calendar'

@Component({
  components: {
  Loading
  }
  })
export default class Calendar extends Vue {
  @Getter('calendarTitle', { namespace: namespaceCalendar }) private calendarTitle: any

  private convertDate!: Date
  private isLoading: boolean = true

  private created () {
    if (this.calendarTitle) {
      this.convertDate = new Date(this.calendarTitle)
    }
  }

  private mounted () {
    setLoading(this, false)
  }

  @Watch('calendarTitle', { immediate: true, deep: true })
  private dataCalendar (val: any, oldVal: any) {
    this.convertDate = new Date(val)
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/_calendar.scss";
</style>
