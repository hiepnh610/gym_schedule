<template>
  <div id="news-feed">
    <div class="container">
      <h1>News Feed</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

@Component
export default class NewsFeed extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/_news-feed.scss";
</style>
