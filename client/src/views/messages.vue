<template>
  <div id="message">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-9">
          <div class="bg-white p-2">
            <ul class="list-unstyled mb-0">
              <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis, eligendi?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed-bottom">
      <div class="container">
        <div class="form-group">
          <textarea class="form-control"></textarea>
        </div>

        <div class="form-group">
          <button class="btn btn-sm btn-primary m-0">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import io from 'socket.io-client'
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

import router from '@/router'
import config from '@/config'
import { Response } from '@/util'

const socket = io.connect('http://localhost:3000/')

@Component
export default class Messages extends Vue {
  private message: string = ''

  private created (): void {
    // this.getAllMessage()

    socket.on('connect', () => {
      console.log(socket.id)
    })
  }

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

  // private addMessage (): void {}
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/_message.scss";
</style>

