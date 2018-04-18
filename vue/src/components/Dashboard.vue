<template>
  <div id="dashboard">
    <div class="container">
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
  padding-top: $size-base * 10;
}
</style>
