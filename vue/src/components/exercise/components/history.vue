<template>
  <div class="history">
    <small class="d-block text-muted text-left border-bottom py-2 px-3">Logs for <em class="text-primary">{{ exerciseName }}</em></small>

    <ul class="list-unstyled m-0">
      <li class="d-flex p-2 align-items-center border-bottom">
        <small class="flex-fill smallest text-left">
          <strong>08/10/2018</strong>
        </small>

        <small class="flex-fill smallest">Set 1: 10 x 10</small>

        <small class="flex-fill">
          <font-awesome-icon icon="times-circle" class="text-danger cursor-pointer" />
        </small>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

@Component({
  components: {
  FontAwesomeIcon
  },
  })
export default class History extends Vue {
  @Prop() exerciseName!: string

  removeHistory (id: string) {}
}
</script>
