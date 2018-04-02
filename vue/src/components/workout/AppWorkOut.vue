<template>
  <div class="text-center">
    <h1 class="text-center">{{ namePlanProp }}</h1>

    <a class="btn btn-md btn-primary" @click.prevent="createWorkout">
      <i class="fa fa-fw fa-plus-circle" aria-hidden="true"></i>
      Create Workout Day
    </a>

    <app-workout-create></app-workout-create>
  </div>
</template>

<script>
import AppWorkoutCreate from './AppWorkoutCreate.vue'

export default {
  name: 'AppWorkout',
  components: { AppWorkoutCreate },
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
