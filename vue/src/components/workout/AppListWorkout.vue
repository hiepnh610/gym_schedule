<template>
  <div class="row" v-if="getListWorkout.length > 0">
    <div class="col-xs-12 col-md-8 col-md-offset-2">
      <table class="table table-striped table-bordered table-hover text-center list-workout">
        <thead>
          <tr>
            <th>name</th>
            <th>week day</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="workout in getListWorkout">
            <td>
              <router-link to="" class="text-primary text-capitalize">{{ workout.name }}</router-link>
            </td>

            <td>{{ workout.week_day }}</td>

            <td>
              <a class="btn btn-sm btn-warning m-r-5">Edit</a>

              <a class="btn btn-sm btn-danger" @click="deletePlan(workout._id)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'

export default {
  name: 'AppListWorkout',
  components: {},
  data () {
    return {
    }
  },
  computed: {
    getListWorkout () {
      return this.$store.getters.listWorkout
    }
  },
  methods: {
    deletePlan (id) {
      this.$store.dispatch('setDeleteWorkout', id)
      axios.delete(config.domainAddress + config.api.workout + id)
      .catch(function (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errContent = error.response.data.message
        } else {
          this.errContent = 'Error happened.'
        }
      }.bind(this))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
@import '../../assets/scss/mixins.scss';

.list-workout {
  img {
    max-width: $size-base * 16;
  }

  thead {
    tr {
      th {
        text-align: center;
      }
    }
  }
}
</style>
