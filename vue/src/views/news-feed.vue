<template>
  <div id="news-feed">
    <h1>News Feed</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

@Component
export default class NewsFeed extends Vue {}
</script>
