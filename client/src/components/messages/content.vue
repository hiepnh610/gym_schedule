<template>
  <div class="col-12 col-lg-9">
    <div class="bg-white p-2 mb-3 list-messages">
      <ul class="list-unstyled mb-0">
        <li v-for="(message, index) in listMessages" :key="index" :class="{ owner: user.username === message.created_by }">{{ message.message }}</li>
      </ul>
    </div>

    <div class="form-group">
      <textarea class="form-control" v-model="contentMessage"></textarea>
    </div>

    <div class="form-group">
      <button class="btn btn-sm btn-primary m-0" @click.prevent="addMessage">Send</button>
    </div>
  </div>
</template>

<script lang="ts">
import io from 'socket.io-client'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

const namespaceRoom: string = 'room'
const namespaceUser: string = 'user'

interface MessageType {
  'created_at'?: string
  'created_by'?: string
  'room_id'?: string
  message?: string
}

@Component
export default class MessagesContent extends Vue {
  @Getter('roomId', { namespace: namespaceRoom }) private roomId: any

  @Getter('user', { namespace: namespaceUser }) private user: any

  private socket: any = io.connect('http://localhost:3000/')
  private message: string = ''
  private contentMessage: string = ''
  private listMessages: MessageType[] = []

  private addMessage (): void {
    const params = {
      room_id: this.roomId,
      message: this.contentMessage
    }

    axios
      .post(config.api.message, params)
      .then((response: Response) => {
        const data = response.data

        this.socket.emit('SEND_MESSAGE', data)
      })
      .catch((error: Response) => {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.$toasted.error('Error happened!!!')
        }
      })
  }

  private getAllMessages (): void {
    const params = { room_id: this.roomId }

    axios
      .get(config.api.message, { params })
      .then((response: Response) => {
        this.listMessages = response.data
      })
      .catch((error: Response) => {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.$toasted.error('Error happened!!!')
        }
      })
  }

  private created (): void {
    this.getAllMessages()

    this.socket.on('MESSAGE', (data: any) => {
      this.listMessages.push(data)
    })
  }
}
</script>
