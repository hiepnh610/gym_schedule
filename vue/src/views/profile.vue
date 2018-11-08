<template>
  <div id="profile">
    <h1>Profile</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

@Component
export default class Profile extends Vue {}
</script>
