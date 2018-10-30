<template>
  <div class="history">
    <small class="d-block text-muted text-left border-bottom py-2 px-3">Logs for <em class="text-primary">{{ exerciseName }}</em></small>

    <ul class="list-unstyled m-0">
      <li class="py-2 px-3 border-bottom" v-for="(history, index) in exerciseHistory" :key="index">
        <div class="row">
          <div class="col text-left">
            <small class="smallest history-date">
              <strong>{{ DateFormat(history.created_at) }}</strong>
            </small>
          </div>

          <div class="col text-left">
            <small class="smallest">
              <span class="d-block" v-for="(set, index) in history.sets" :key="index">Set {{ index + 1 }}: {{ set.weight }} x {{ set.reps }}</span>
            </small>
          </div>

          <div class="col">
            <small>
              <font-awesome-icon icon="times-circle" class="text-danger cursor-pointer" />
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

@Component({
  components: {
  FontAwesomeIcon
  },
  })
export default class History extends Vue {
  @Prop() exerciseName!: string
  @Prop() exerciseHistory!: any

  DateFormat (date: string): string {
    return moment(date).format('DD/MM/YYYY')
  }

  removeHistory (id: string) {}
}
</script>
