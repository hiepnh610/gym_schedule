<template>
  <div class="note text-left">
    <div class="note-box p-3">
      <small class="text-muted mb-1 d-block">Note:</small>

      <textarea-autosize
      class="form-control"
      :min-height="60"
      :max-height="300"
      v-model="noteContent" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

import config from '@/config'
import { Response, ID } from '@/util'

@Component
export default class Note extends Vue {
  private noteContent: string = ''
}
</script>
