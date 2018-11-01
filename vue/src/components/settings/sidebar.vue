<template>
  <ul class="list-group sidebar">
    <li class="list-group-item sidebar-header">
      <h6 class="m-0">Personal settings</h6>
    </li>

    <li class="list-group-item" :key="setting" v-for="setting in settingsName">
      <router-link :to="/settings/ + setting" class="text-capitalize text-muted">
        {{ setting }}
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Sidebar extends Vue {
  settingsName: string[] = ['profile', 'account']
}
</script>
