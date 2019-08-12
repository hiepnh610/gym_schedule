<template>
  <div class="col-12 col-lg-3">
    <div class="message-sidebar">
      <ul class="list-unstyled">
        <li v-for="(room, index) in roomList" :key="index" :class="{ selected: room.username === username }">
          <img :src="room.avatar" v-if="room.avatar" alt="" />

          <img src="@/assets/images/avatar-default.png" v-else alt="" />

          <h6>{{ room.full_name }}</h6>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import io from 'socket.io-client'
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

interface RoomType {
  avatar: string
  full_name: string
  username: string
}

@Component
export default class MessagesSidebar extends Vue {
  private message: string = ''
  private socket: any = io.connect('http://localhost:3000/')
  private roomList: RoomType[] = []
  private username: string = ''

  private created (): void {
    this.username = this.$route.params.username
    this.getAllRooms()
  }

  private getAllRooms (): void {
    axios
      .get(config.api.roomAll)
      .then((response: Response) => {
        this.roomList = response.data
      })
      .catch((error: Response) => {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }
      })
  }
}
</script>
