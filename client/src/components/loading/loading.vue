<template>
  <div id="loading">
    <font-awesome-icon icon="spinner" spin />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Loading extends Vue {
}
</script>
