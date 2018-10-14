<template>
  <div id="splash">
    <font-awesome-icon icon="spinner" spin />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

@Component({
  components: {
  FontAwesomeIcon,
  },
  })
export default class Splash extends Vue {
}
</script>
