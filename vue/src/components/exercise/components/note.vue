<template>
  <div class="note text-left">
    <div class="note-list pt-3 pr-3 pl-3" v-for="(history, index) in newListNotes" :key="index" v-if="history.note">
      <div class="row">
        <div class="col-12">
          <p class="text-secondary mb-2" v-if="isEdit !== index"><small>{{ history.note }}</small></p>

          <textarea-autosize
          class="form-control mb-2"
          :min-height="60"
          :max-height="300"
          :value="history.note"
          v-if="isEdit === index"
          ref="textareaEdit" />
        </div>

        <div class="col-6 text-left">
          <small class="smallest">{{ DateFormat(history.created_at) }}</small>
        </div>

        <div class="col-6 text-right" v-if="isEdit !== index">
          <a href="#" class="text-warning smallest" @click.prevent="editNote(index)">Edit</a>

          <a href="#" class="text-danger smallest ml-3" @click.prevent="removeNote(history._id)">Remove</a>
        </div>

        <div class="col-6 text-right" v-if="isEdit === index">
          <a href="#" class="text-success smallest" @click.prevent="saveNoteEdited(history._id)">Save</a>

          <a href="#" class="text-secondary smallest ml-3" @click.prevent="cancelEditNote">Cancel</a>
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

interface NewListNotes {
  _id: String;
  'created_at': String;
  note: String;
  'exercise_id': String;
}

interface ParamsExerciseNoteStatus {
  status: string;
}

interface ParamsExerciseNoteUpdate extends ParamsExerciseNoteStatus {
  note: string;
}

const namespaceNotes: string = 'notes'

@Component({
  components: {
  FontAwesomeIcon
  },
  })
export default class Note extends Vue {
  @Action('setDeleteNote', { namespace: namespaceNotes }) setDeleteNote: any
  @Action('setUpdateNote', { namespace: namespaceNotes }) setUpdateNote: any
  @Getter('listNotes', { namespace: namespaceNotes }) listNotes: any

  newListNotes: Array<NewListNotes> = []
  noteContent: string = ''
  isEdit: number = -1

  DateFormat (date: string) {
    return moment(date).format('DD/MM/YYYY')
  }

  removeNote (id: string) {
    this.setDeleteNote(id)

    const params: ParamsExerciseNoteStatus = {
      status: 'Delete'
    }

    axios
      .put(config.api.note + id, params)
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

  editNote (index: number) {
    this.isEdit = index
  }

  cancelEditNote () {
    this.isEdit = -1
  }

  saveNoteEdited (id: string) {
    const textareaEdit: any = this.$refs.textareaEdit

    const params: ParamsExerciseNoteUpdate = {
      note: textareaEdit[0].val,
      status: 'Update'
    }

    axios
      .put(config.api.note + id, params)
      .then(function (response: Response) {
        this.loading = false
        this.isEdit = -1

        this.setUpdateNote(response.data)

        this.$toasted.success('Update Successfully!!!')
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errContent = error.response.data.message
        } else {
          this.$toasted.error('Error happened!!!')
        }

        this.loading = false
      }.bind(this))
  }

  @Watch('listNotes', { immediate: true, deep: true })
  dataNotes (val: any, oldVal: any) {
    this.newListNotes = val
  }
}
</script>
