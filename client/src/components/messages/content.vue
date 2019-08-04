<template>
  <div class="col-12 col-lg-9">
    <div class="bg-white p-2 mb-3">
      <ul class="list-unstyled mb-0">
        <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis, eligendi?</li>
      </ul>
    </div>

    <div class="form-group">
      <textarea class="form-control"></textarea>
    </div>

    <div class="form-group">
      <button class="btn btn-sm btn-primary m-0" @click.prevent="addMessage">Send</button>
    </div>
  </div>
</template>

<script lang="ts">
import io from 'socket.io-client'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MessagesContent extends Vue {
  private socket: any = io.connect('http://localhost:3000/')

  private addMessage (): void {
    this.socket.emit('SEND_MESSAGE', {
        user: 'John Doe',
        message: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.'
    })
  }
}
</script>
