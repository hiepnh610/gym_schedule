<template>
  <div class="modal fade text-left" v-show="showBackgroundModal && showCreateExercise" :class="{ 'show animated bounceIn': showBackgroundModal && showCreateExercise }" :style="{ display: 'block' }">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-body">
          <h2 class="text-center text-success">Exercises</h2>

          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="exercise in exercises">
              <div class="d-flex" @click.prevent="exerciseCreate(exercise)">
                <img :src="exercise.image" class="rounded-0 img-thumbnail" />

                <div class="body">{{ exercise.name }}</div>
              </div>
            </li>
          </ul>

          <div class="form-group text-center mb-0 aligh-center">
            <button href="dashboard" class="btn btn-md btn-secondary" @click.prevent="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'

export default {
  name: 'AppExerciseCreate',

  data () {
    return {
      exercises: require('./exercises.json')
    }
  },

  methods: {
    closeModal () {
      this.$store.dispatch('setShowBackgroundModal', false)
    },

    exerciseCreate (exercise) {
      if (!exercise.name) {
        this.message = 'The exercise name cannot be blank.'

        return
      }

      if (!exercise.image) {
        this.message = 'The exercise image cannot be blank.'

        return
      }

      const params = {
        image: exercise.image,
        name: exercise.name,
        workout_id: this.$route.params.id
      }

      axios
        .post(config.domainAddress + config.api.exercise, params)
        .then(function (response) {
          this.$toasted.success('Create Successfully!!!')
        }.bind(this))
        .catch(function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            this.message = error.response.data.message
          } else {
            this.$toasted.error('Error happened!!!')
          }
        }.bind(this))
    }
  },

  computed: {
    showBackgroundModal () {
      return this.$store.getters.showBackgroundModal
    },

    showCreateExercise () {
      return this.$store.getters.showCreateModal
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variables.scss';
  @import '../../assets/scss/mixins.scss';

  .list-group {
    max-height: 60vh;
    margin-bottom: $size-base;
    overflow-x: hidden;
    overflow-y: scroll;

    .list-group-item {
      cursor: pointer;
      padding-left: 0;
      padding-right: 0;

      .d-flex {
        align-items: center;
      }

      img {
        margin-right: $size-base;
        max-width: $size-base * 5;
      }
    }
  }
</style>
