<template>
  <div class="text-center">
    <h1 class="text-center">{{ namePlan }}</h1>

    <a class="btn btn-md btn-primary">
      <i class="fa fa-fw fa-plus-circle" aria-hidden="true"></i>
      Create Exercise
    </a>
  </div>
</template>

<script>
export default {
  name: 'AppExercise',
  components: {},
  data () {
    return {
      namePlan: ''
    }
  },
  methods: {
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
