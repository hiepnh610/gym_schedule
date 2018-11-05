<template>
  <div class="note text-left">
    <div class="note-list border-bottom pl-3 pr-3 pb-3 pt-2" v-for="(note, index) in listNotes" :key="index">
      <div class="row">
        <div class="col-12">
          <p class="text-secondary mb-2"><small>{{ note.text }}</small></p>
        </div>

        <div class="col-6 text-left">
          <small class="smallest">{{ DateFormat(note.created_at) }}</small>
        </div>

        <div class="col-6 text-right">
          <a href="#" class="text-warning smallest">Edit</a>

          <a href="#" class="text-danger smallest ml-3" @click.prevent="removeNote(note._id)">Remove</a>
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

import config from '@/config'
import { Response, ID } from '@/util'

const namespaceNotes: string = 'notes'

@Component({
  components: {
  FontAwesomeIcon
  },
  })
export default class Note extends Vue {
  @Action('setDeleteNote', { namespace: namespaceNotes }) setDeleteNote: any
  @Getter('listNotes', { namespace: namespaceNotes }) listNotes: any

  noteContent: string = ''

  DateFormat (date: string) {
    return moment(date).format('DD/MM/YYYY')
  }

  removeNote (id: string) {
    this.setDeleteNote(id)

    axios
      .delete(config.domainAddress + config.api.note + id)
      .then(function () {
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
