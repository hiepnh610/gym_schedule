<template>
  <div class="track-log">
    <div class="track-log-header">
      <div class="row justify-content-between align-items-center">
        <div class="col-12 col-md-4">
          <a href="#" @click.prevent="addMoreSet">
            Add more set

            <font-awesome-icon icon="plus-circle" class="ml-2" />
          </a>
        </div>

        <div class="col-12 col-md-4">
          <div class="select-custom">
            <font-awesome-icon icon="caret-down" />

            <select class="form-control" v-model="status">
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
            <th class="text-nowrap">{{ setNumber.length }} sets</th>
            <th>Weight</th>
            <th>Reps</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(set, index) in setNumber" :key="index">
            <td>{{ index + 1 }}</td>

            <td>
              <input type="text" class="form-control" v-model.number="set.weight">
            </td>

            <td>
              <input type="text" class="form-control" v-model.number="set.reps">
            </td>

            <td>
              <font-awesome-icon icon="times-circle" class="text-danger cursor-pointer" @click="removeSet(index)" />
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

interface Set {
  weight: number;
  reps: number;
}

@Component({
  components: {
  FontAwesomeIcon
  },
  })
export default class TrackLog extends Vue {
  setNumber: Array<Set> = [
    {
      weight: 0,
      reps: 0
    },
    {
      weight: 0,
      reps: 0
    }
  ]
  status: string = ''

  addMoreSet () {
    this.setNumber.push({
      weight: 0,
      reps: 0
    })
  }

  removeSet (index: number) {
    this.setNumber.splice(index, 1)
  }
}
</script>
