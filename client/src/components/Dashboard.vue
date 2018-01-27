<template>
  <div id="dashboard">
    <div class="container">
      <app-plan></app-plan>
    </div>
  </div>
</template>

<script>
import AppPlan from './plan/AppPlan.vue'

export default {
  name: 'DashBoard',
  components: { AppPlan }
}
</script>

<style lang="scss" scoped>
#dashboard {
  padding-top: 120px;
}
</style>
