<template>
  <div id="message">
    <div class="container-fluid">
      <div class="row">
        <messages-sidebar></messages-sidebar>

        <messages-content></messages-content>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import io from 'socket.io-client'
import { Component, Vue } from 'vue-property-decorator'

import messagesSidebar from '@/components/messages/sidebar.vue'
import messagesContent from '@/components/messages/content.vue'

@Component({
  components: {
    messagesSidebar,
    messagesContent
  }
})
export default class Messages extends Vue {
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/_message.scss";
</style>

