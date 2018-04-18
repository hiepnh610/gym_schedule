<template>
  <div id="dashboard">
    <div class="container">
      <div class="text-center mb-5">
        <div class="btn-group" role="group">
          <router-link to="/dashboard/plan" class="btn btn-md btn-success">Your Plan</router-link>

          <router-link to="" class="btn btn-md btn-success">Calendar</router-link>
        </div>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashBoard'
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';
@import '../assets/scss/mixins.scss';

#dashboard {
  padding-top: $size-base * 8;
}
</style>
