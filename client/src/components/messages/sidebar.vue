<template>
  <div class="col-12 col-lg-3">
    <ul class="list-unstyled">
      <li>
        <img src="@/assets/images/avatar-default.png" alt="" />

        <h4>John Doe</h4>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import io from 'socket.io-client'
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

@Component
export default class MessagesSidebar extends Vue {
  private message: string = ''
  private socket: any = io.connect('http://localhost:3000/')

  private created (): void {
    // this.getAllRooms()

    this.socket.on('MESSAGE', (data: any) => {
      console.log(data)
    });

    console.log(this.$route.params.username);
  }

  // private getAllRooms (): void {
  //   axios
  //     .get(config.api.room)
  //     .then((response: Response) => {
  //     })
  //     .catch((error: Response) => {
  //       if (error.response && error.response.data && error.response.data.message) {
  //         this.message = error.response.data.message
  //       } else {
  //         this.message = 'Error happened.'
  //       }
  //     })
  // }

  // private getAllMessage (): void {
  //   axios
  //     .get(config.api.message)
  //     .then((response: Response) => {
  //     })
  //     .catch((error: Response) => {
  //       if (error.response && error.response.data && error.response.data.message) {
  //         this.message = error.response.data.message
  //       } else {
  //         this.message = 'Error happened.'
  //       }
  //     })
  // }
}
</script>
