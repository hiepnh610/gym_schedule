<template>
  <div class="text-center">
    <h1 class="text-center mb-5">{{ planName }}</h1>

    <list-workouts v-if="listWorkouts.length > 0"></list-workouts>

    <p v-if="listWorkouts.length === 0" class="align-center mb-5">Please create a workout day from the under button.</p>

    <a href="" class="btn btn-md btn-success" @click.prevent="createWorkout" v-if="displayBtn">
      <font-awesome-icon icon="plus-circle" />
      Create Workout Day
    </a>

    <workout-create></workout-create>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

import workoutCreate from '@/components/workout/workout-create.vue'
import listWorkouts from '@/components/workout/list-workouts.vue'

@Component({
  components: {
  workoutCreate,
  listWorkouts,
  FontAwesomeIcon,
  },
  })
export default class Workouts extends Vue {
  @Prop() id!: string

  @Action('setShowModalBackdrop', { namespace: 'modal' }) setShowModalBackdrop: any
  @Action('setShowCreateModal', { namespace: 'modal' }) setShowCreateModal: any

  planName: string = ''
  planFrequency: string = ''

  createWorkout () {
    this.setShowModalBackdrop(true)
    this.setShowCreateModal(true)
  }

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
    }

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
  @import '@/assets/scss/variables.scss';
  @import '@/assets/scss/mixins.scss';

  h1 {
    margin-bottom: $size-base * 2;
  }
</style>
