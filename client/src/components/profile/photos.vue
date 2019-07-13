<template>
  <div class="row">
    <div class="col-6 col-lg-3 mb-4" v-for="(image, index) in listImages" :key="index" v-lazy-container="{ selector: 'img' }">
      <div class="avatar">
        <div class="avatar-container">
          <img :data-src="image.url" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

interface TypeImage {
  url?: string
}

interface TypeParams {
  username: string
}

@Component
export default class ProfilePhotos extends Vue {
  private message: string = ''
  private listImages: TypeImage[] = []

  private created(): void {
    const params: TypeParams = {
      username: this.$route.params.user
    }

    axios
      .get(config.api.images, { params })
      .then(function (response: Response) {
        if (response.data) {
          this.listImages = response.data
        }
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }
      }.bind(this))
  }
}
</script>
