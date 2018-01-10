<template>
  <div id="app">
    <app-nav></app-nav>

    <router-view></router-view>
  </div>
</template>

<script>
import AppNav from './AppNav.vue'
export default {
  name: 'app',
  components: { AppNav },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss"></style>