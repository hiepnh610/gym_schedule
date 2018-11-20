<template>
  <div class="history">
    <small class="d-block text-muted text-left py-2 px-3 bg-light">Logs for <em class="text-primary">{{ exerciseName }}</em></small>

    <ul class="list-unstyled m-0">
      <li class="py-2 px-3" v-for="(history, index) in listHistories" :key="index">
        <div class="row">
          <div class="col text-left">
            <small class="smallest history-date">
              <strong>{{ DateFormat(history.created_at) }}</strong>
            </small>
          </div>

          <div class="col text-left">
            <small class="smallest">
              <span class="d-block mb-1" v-for="(set, index) in history.sets" :key="index">Set {{ index + 1 }}: {{ set.weight }} kg x {{ set.reps }} reps</span>
            </small>
          </div>

          <div class="col">
            <small>
              <font-awesome-icon icon="times-circle" class="text-danger cursor-pointer" @click.prevent="removeHistory(history._id)" />
            </small>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import moment from 'moment'

import config from '@/config'
import { Response, ID } from '@/util'

const namespaceHistories: string = 'histories'

@Component({
  components: {
  FontAwesomeIcon
  },
  })
export default class History extends Vue {
  @Prop() exerciseName!: string

  @Action('setDeleteHistory', { namespace: namespaceHistories }) setDeleteHistory: any
  @Getter('listHistories', { namespace: namespaceHistories }) listHistories: any

  DateFormat (date: string): string {
    return moment(date).format('DD/MM/YYYY')
  }

  removeHistory (id: string) {
    this.setDeleteHistory(id)

    axios
      .delete(config.domainAddress + config.api.history + id)
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
