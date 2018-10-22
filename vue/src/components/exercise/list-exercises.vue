<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <table class="table table-striped text-center mb-5">
          <thead>
            <tr>
              <th>image</th>
              <th>name</th>
              <th>sets</th>
              <th>status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(workout, index) in listExercises" :key="index">
              <td>
                <div class="image">
                  <img :src="workout.image" alt="">
                </div>
              </td>

              <td>
                <router-link :to="'../exercises/' + workout._id" class="text-capitalize">{{ workout.name }}</router-link>
              </td>

              <td>{{ workout.sets }}</td>

              <td>{{ workout.status }}</td>

              <td>
                <a href="" class="btn btn-sm btn-warning mr-1" @click.prevent="updateWorkout(workout)">Edit</a>

                <a href="" class="btn btn-sm btn-danger" @click.prevent="deleteWorkout(workout._id)">Remove</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

const namespaceExercises: string = 'exercises'

@Component({
  components: {
  FontAwesomeIcon
  },
  })
export default class ListExercises extends Vue {
@Getter('listExercises', { namespace: namespaceExercises }) listExercises: any
}
</script>
