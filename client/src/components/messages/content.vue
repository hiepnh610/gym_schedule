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
import { Component, Vue, Watch } from 'vue-property-decorator'
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
  @Action('setRoomId', { namespace: namespaceRoom }) private setRoomId: any
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

        this.contentMessage = ''
        this.socket.emit('send', { room: this.roomId, message: data })
      })
      .catch((error: Response) => {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.$toasted.error('Error happened!!!')
        }
      })
  }

  private getMessages (roomId: string): void {
    const params = { room_id: roomId }

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

  private getChatRoom (): void {
    const query: string = this.$route.params.username

    axios
      .post(config.api.room, { username: [query] })
      .then((response: Response) => {
        const roomId: string = response.data._id

        this.setRoomId(roomId)
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
    this.getChatRoom()

    this.socket.on('message', (data: any) => {
      this.listMessages.push(data.message)
    })
  }

  @Watch('roomId', { immediate: true, deep: true })
  private getRoomId (val: any, oldVal: any) {
    if (val) {
      this.getMessages(val)
      this.socket.emit('subscribe', this.roomId)
    }
  }
}
</script>
