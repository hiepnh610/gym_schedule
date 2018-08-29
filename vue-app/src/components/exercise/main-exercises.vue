<template>
  <div class="text-center">
    <h1 class="text-center mb-5">{{ exerciseName }}</h1>

    <list-exercises v-if="listExercise.length > 0"></list-exercises>

    <p class="align-center mb-5">Please add some exercies from the under button.</p>

    <a href="" class="btn btn-md btn-success" @click.prevent="createExercise">
      <font-awesome-icon icon="plus-circle" />
      Add Exercise
    </a>

    <exercise-create></exercise-create>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from '@/config'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  import exerciseCreate from './exercise-create.vue'
  import listExercises from './list-exercises.vue'

  export default {
    name: 'main-exercises',

    components: { exerciseCreate, listExercises, FontAwesomeIcon },

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
        .get(config.domainAddress + config.api.exercise, {
          params: {
            id: this.id
          }
        })
        .then(function (response) {
          this.$store.dispatch('setListExercise', response.data)
        }.bind(this))
        .catch(function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            this.errContent = error.response.data.message
          } else {
            this.errContent = 'Error happened.'
          }
        }.bind(this))

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
    },

    computed: {
      listExercise () {
        return this.$store.getters.listExercise
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
