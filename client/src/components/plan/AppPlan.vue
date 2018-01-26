<template>
  <div class="p-v-60 text-center">
    <app-list-plans></app-list-plans>

    <a class="btn btn-md btn-success" @click.prevent="createPlan">
      <i class="fa fa-fw fa-plus-circle" aria-hidden="true"></i>
      Create Plan
    </a>

    <app-plan-create></app-plan-create>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'

import AppPlanCreate from './AppPlanCreate.vue'
import AppListPlans from './AppListPlans.vue'

export default {
  name: 'AppPlan',
  components: { AppPlanCreate, AppListPlans },
  data () {
    return {
    }
  },
  methods: {
    createPlan () {
      this.$store.dispatch('setShowModal', true)
    }
  },
  created () {
    axios.get(config.domainAddress + config.api.plans)
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

<style lang="scss"></style>
