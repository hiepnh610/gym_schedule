<template>
  <div class="text-center">
    <h1 class="text-center mb-5">Plan</h1>

    <app-list-plans v-if="listPlans.length > 0"></app-list-plans>

    <p v-if="listPlans.length === 0" class="align-center text-muted mb-5">Please create a plan from the under button.</p>

    <a href="" class="btn btn-md btn-success" @click.prevent="createPlan">
      <font-awesome-icon icon="plus-circle" />
      Create Plan
    </a>

    <app-plan-create></app-plan-create>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

import AppPlanCreate from './AppPlanCreate.vue'
import AppListPlans from './AppListPlans.vue'

export default {
  name: 'AppPlan',

  components: { AppPlanCreate, AppListPlans, FontAwesomeIcon },

  data () {
    return {
    }
  },

  methods: {
    createPlan () {
      this.$store.dispatch('setShowBackgroundModal', true)
      this.$store.dispatch('setShowCreateModal', true)
    }
  },

  created () {
    axios
      .get(config.domainAddress + config.api.plans, {
        params: {
          id: this.$session.get('id')
        }
      })
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
  },

  computed: {
    listPlans () {
      return this.$store.getters.listPlans
    }
  }
}
</script>

<style lang="scss"></style>
