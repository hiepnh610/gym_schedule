<template>
  <div class="note text-left">
    <div class="note-box p-3">
      <textarea-autosize
      class="form-control"
      :min-height="60"
      :max-height="300"
      v-model="noteContent" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import moment from 'moment'
import axios from 'axios'

import config from '@/config'
import { Response, ID } from '@/util'

@Component({
  components: {
  FontAwesomeIcon
  },
  })
export default class Note extends Vue {
  noteContent: string = ''
}
</script>
