<template>
  <ul class="list-group">
    <li class="list-group-item header">Personal settings</li>
    <li class="list-group-item" v-bind:key="setting" v-for="setting in settingsName">
      <router-link :to="/settings/ + setting" class="text-capitalize" :class="{ 'text-success': urlParam === setting, 'text-dark': urlParam !== setting }">{{ setting }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      settingsName: ['profile', 'account'],
      urlParam: this.$route.path
    }
  },

  created () {
    const splitParam = this.urlParam.split('/')

    this.urlParam = splitParam[splitParam.length - 1]
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
@import '../../assets/scss/mixins.scss';

  .list-group {
    .header {
      background: $gray-200;
    }
  }
</style>

