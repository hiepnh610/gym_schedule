<template>
  <div class="track-log">
    <div class="track-log-header">
      <div class="row justify-content-between">
        <div class="col-12 col-md-4">
          <a href="#" @click.prevent="addMoreSet">
            Add more set

            <font-awesome-icon icon="plus-circle" />
          </a>
        </div>

        <div class="col-12 col-md-4">
          <div class="select-custom">
            <font-awesome-icon icon="caret-down" />

            <select class="form-control">
              <option value="" disabled selected>Status</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="track-log-content">
      <table class="table">
        <thead class="thead-light">
          <tr>
            <th class="text-nowrap">2 sets</th>
            <th>Weight</th>
            <th>Reps</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>

            <td>
              <input type="text" class="form-control">
            </td>

            <td>
              <input type="text" class="form-control">
            </td>

            <td>
              <font-awesome-icon icon="times-circle" class="text-danger" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
export default class TrackLog extends Vue {
  setNumber: number = 2

  addMoreSet () {}

  removeSet () {}
}
</script>
