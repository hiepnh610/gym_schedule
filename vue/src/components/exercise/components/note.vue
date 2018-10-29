<template>
  <div class="note text-left">
    <div class="note-list border-bottom pl-3 pr-3 pb-3 pt-2" v-for="(note, index) in noteList" :key="index">
      <div class="row">
        <div class="col-12">
          <p class="text-secondary mb-2"><small>{{ note.text }}</small></p>
        </div>

        <div class="col-6 text-left">
          <small class="smallest">{{ customFormatter(note.created_at) }}</small>
        </div>

        <div class="col-6 text-right">
          <a href="#" class="text-warning smallest">Edit</a>

          <a href="#" class="text-danger smallest ml-3">Remove</a>
        </div>
      </div>
    </div>

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

@Component({
  components: {
  FontAwesomeIcon
  },
  })
export default class Note extends Vue {
  @Prop() exerciseNote!: any

  noteContent: string = ''
  noteList: string[] = this.exerciseNote

  customFormatter (date: string) {
    return moment(date).format('DD/MM/YYYY')
  }

  @Watch('exerciseNote', { immediate: true, deep: true })
  dataNote (val: any, oldVal: any) {
    this.noteList = val
  }
}
</script>
