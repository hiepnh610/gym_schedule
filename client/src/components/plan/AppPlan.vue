<template>
  <div class="p-v-60 text-center">
    <a href="dashboard/plan/create" class="btn btn-md btn-success">
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
  components: { AppPlanCreate }
}
</script>

<style lang="scss"></style>
