<template>
  <div class="text-center">
    <h1 class="text-center mb-5">{{ planName }}</h1>

    <app-list-workout v-if="listWorkouts.length > 0"></app-list-workout>

    <p v-if="listWorkouts.length === 0" class="align-center text-muted mb-5">Please create a workout day from the under button.</p>

    <a href="" class="btn btn-md btn-success" @click.prevent="createWorkout" v-if="displayBtn">
      <font-awesome-icon icon="plus-circle" />
      Create Workout Day
    </a>

    <app-workout-create></app-workout-create>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

import AppWorkoutCreate from './AppWorkoutCreate.vue'
import AppListWorkout from './AppListWorkout.vue'

export default {
  name: 'AppWorkout',

  components: { AppWorkoutCreate, AppListWorkout, FontAwesomeIcon },

  props: {
    id: { type: String }
  },

  data () {
    return {
      planName: '',
      planFrequency: ''
    }
  },

  methods: {
    createWorkout () {
      this.$store.dispatch('setShowBackgroundModal', true)
      this.$store.dispatch('setShowCreateModal', true)
    }
  },

  created () {
    axios
      .get(config.domainAddress + config.api.workout, {
        params: {
          id: this.id
        }
      })
      .then(function (response) {
        this.$store.dispatch('setListWorkout', response.data)
      }.bind(this))
      .catch(function (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errContent = error.response.data.message
        } else {
          this.errContent = 'Error happened.'
        }
      }.bind(this))

    axios
      .get(config.domainAddress + config.api.listPlans, {
        params: {
          id: this.id
        }
      })
      .then(function (response) {
        this.planName = response.data[0].name
        this.planFrequency = response.data[0].frequency
      }.bind(this))
      .catch(function (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errContent = error.response.data.message
        } else {
          this.errContent = 'Error happened.'
        }
      }.bind(this))
  },

  computed: {
    listWorkouts () {
      return this.$store.getters.listWorkout
    },

    displayBtn () {
      if (this.listWorkouts.length < this.planFrequency) {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
@import '../../assets/scss/mixins.scss';
  h1 {
    margin-bottom: $size-base * 2;
  }
</style>
