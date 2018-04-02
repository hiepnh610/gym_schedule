<template>
  <div class="text-center">
    <h1 class="text-center">{{ namePlan }}</h1>

    <a class="btn btn-md btn-primary" @click.prevent="createExercise">
      <i class="fa fa-fw fa-plus-circle" aria-hidden="true"></i>
      Create Exercise
    </a>

    <app-exercise-create></app-exercise-create>
  </div>
</template>

<script>
import AppExerciseCreate from './AppExerciseCreate.vue'

export default {
  name: 'AppExercise',
  components: { AppExerciseCreate },
  data () {
    return {
      namePlan: ''
    }
  },
  methods: {
    createExercise () {
      this.$store.dispatch('setShowBackgroundModal', true)
      this.$store.dispatch('setShowCreateModal', true)
    }
  },
  created () {
    this.namePlan = this.$store.getters.namePlan
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
