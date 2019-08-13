<template>
  <div class="col-12 col-lg-9">
    <div class="bg-white p-3 mb-3 list-messages">
      <ul class="list-unstyled mb-0">
        <li v-for="(message, index) in messagesList" :key="index" :class="{ owner: user.username === message.created_by }">{{ message.message }}</li>
      </ul>
    </div>

    <div class="form-group mb-0">
      <textarea class="form-control" v-model="contentMessage" @keydown.enter.exact.prevent @keyup.enter.exact="addMessage"></textarea>
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

import router from '@/router'

const namespaceRoom: string = 'room'
const namespaceUser: string = 'user'
const namespaceStoreMessage: string = 'storeMessage'

@Component
export default class MessagesContent extends Vue {
  @Action('setRoomId', { namespace: namespaceRoom }) private setRoomId: any
  @Getter('roomId', { namespace: namespaceRoom }) private roomId: any

  @Getter('user', { namespace: namespaceUser }) private user: any

  @Action('setMessagesList', { namespace: namespaceStoreMessage }) private setMessagesList: any
  @Action('setToAddMessage', { namespace: namespaceStoreMessage }) private setToAddMessage: any
  @Getter('messagesList', { namespace: namespaceStoreMessage }) private messagesList: any

  private socket: any = io.connect('http://localhost:3000/')
  private message: string = ''
  private contentMessage: string = ''

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
        this.setMessagesList(response.data)
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

        router.push('/messages/list')
      })
  }

  private created (): void {
    this.getChatRoom()

    this.socket.on('message', (data: any) => {
      this.setToAddMessage(data.message)
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
