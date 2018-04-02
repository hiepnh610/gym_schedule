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
#dashboard {
  padding-top: 120px;
}
</style>
