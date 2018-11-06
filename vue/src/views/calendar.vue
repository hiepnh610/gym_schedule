<template>
  <div id="calendar" v-if="!isLoading">
    <div class="container">
      <div class="text-center mb-5">
        <full-calendar :events="fcEvents" locale="en" firstDay="1"></full-calendar>
      </div>
    </div>
  </div>

  <loading v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import config from '@/config'
import { Response, ID, setLoading } from '@/util'

import Loading from '@/components/loading/loading.vue'

interface fakeData {
  title: String;
  start: String;
}

@Component({
  components: {
  FontAwesomeIcon,
  Loading,
  },
  })
export default class Calendar extends Vue {
  isLoading: boolean = true
  fcEvents: Array<fakeData> = [{
    title: 'Sunny Out of Office',
    start: '2018-11-06'
  }]

  created () {
    setLoading(this, false)
  }
}
</script>
