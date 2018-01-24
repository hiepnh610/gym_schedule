<template>
  <div class="p-v-60 text-center">
    <a class="btn btn-md btn-success" @click.prevent="createPlan">
      <i class="fa fa-fw fa-plus-circle" aria-hidden="true"></i>
      Create Plan
    </a>

    <app-plan-create></app-plan-create>
  </div>
</template>

<script>
import AppPlanCreate from './AppPlanCreate.vue'
export default {
  name: 'AppPlan',
  components: { AppPlanCreate },
  data () {
    return {
    }
  },
  methods: {
    createPlan () {
      this.$store.dispatch('setShowCreateModal', true)
    }
  }
}
</script>

<style lang="scss"></style>
