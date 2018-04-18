<template>
  <div class="text-center">
    <h1 class="text-center">{{ exerciseName }}</h1>

    <p class="align-center text-muted">Please add some exercies from the under button.</p>

    <a href="" class="btn btn-md btn-success" @click.prevent="createExercise">
      <i class="fa fa-fw fa-plus-circle" aria-hidden="true"></i>
      Add Exercise
    </a>

    <app-exercise-create></app-exercise-create>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'

import AppExerciseCreate from './AppExerciseCreate.vue'

export default {
  name: 'AppPlan',

  components: { AppExerciseCreate },

  data () {
    return {
      exerciseName: ''
    }
  },

  props: {
    id: { type: String }
  },

  created () {
    axios
      .get(config.domainAddress + config.api.listWorkout, {
        params: {
          id: this.id
        }
      })
      .then(function (response) {
        this.exerciseName = response.data[0].name
      }.bind(this))
      .catch(function (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errContent = error.response.data.message
        } else {
          this.errContent = 'Error happened.'
        }
      }.bind(this))
  },

  methods: {
    createExercise () {
      this.$store.dispatch('setShowBackgroundModal', true)
      this.$store.dispatch('setShowCreateModal', true)
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
