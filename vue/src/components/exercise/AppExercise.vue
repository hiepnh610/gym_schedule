<template>
  <div class="text-center">
    <h1 class="text-center">{{ exerciseName }}</h1>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'

export default {
  name: 'AppPlan',

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
