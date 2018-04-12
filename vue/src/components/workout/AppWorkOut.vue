<template>
  <div class="text-center">
    <h1 class="text-center">{{ namePlanProp }}</h1>

    <app-list-workout></app-list-workout>

    <a class="btn btn-md btn-primary" @click.prevent="createWorkout">
      <i class="fa fa-fw fa-plus-circle" aria-hidden="true"></i>
      Create Workout Day
    </a>

    <app-workout-create></app-workout-create>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'

import AppWorkoutCreate from './AppWorkoutCreate.vue'
import AppListWorkout from './AppListWorkout.vue'

export default {
  name: 'AppWorkout',
  components: { AppWorkoutCreate, AppListWorkout },
  data () {
    return {
      namePlanProp: ''
    }
  },
  methods: {
    createWorkout () {
      this.$store.dispatch('setShowBackgroundModal', true)
      this.$store.dispatch('setShowCreateModal', true)
    }
  },
  created () {
    this.namePlanProp = this.$store.getters.namePlanProp

    axios.get(config.domainAddress + config.api.workout, {
      params: {
        id: this.$route.params.id
      }
    })
    .then(function (response) {
      this.$store.dispatch('setListPlans', response.data)
    }.bind(this))
    .catch(function (error) {
      if (error.response && error.response.data && error.response.data.message) {
        this.errContent = error.response.data.message
      } else {
        this.errContent = 'Error happened.'
      }
    }.bind(this))
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
@import '../../assets/scss/mixins.scss';
  h1 {
    margin-bottom: $size-base * 20;
  }
</style>
