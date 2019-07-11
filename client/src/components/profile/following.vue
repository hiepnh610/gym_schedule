<template>
  <div class="row">
    <div v-for="(follower, index) in listFollower" :key="index" class="col-12 col-md-6">
      <div class="list-cards list-cards-horizontal list-cards-small-size text-left">
        <div class="card border">
          <div class="image bg-light p-2">
            <a :href="domain + follower.username">
              <img :src="follower.avatar" alt="" v-if="follower.avatar" />

              <img src="@/assets/images/avatar-default.png" alt="" v-else />
            </a>
          </div>

          <h6 class="card-title mb-2">
            <a :href="domain + follower.username">{{ follower.full_name }}</a>
          </h6>

          <a href="#" class="badge badge-pill badge-outline" v-if="follower.isFollowing">
            <font-awesome-icon icon="check" class="mr-1" />

            Following
          </a>

          <a href="#" class="badge badge-pill badge-primary" v-else>
            <font-awesome-icon icon="user-plus" class="mr-1" />

            Follower
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

interface TypeFollower {
  full_name?: string
  avatar?: string
}

@Component
export default class Following extends Vue {
  private message: string = ''
  private listFollower: TypeFollower[] = []
  private domain: string = `${window.location.origin}/profile/`

  private created(): void {
    axios
      .get(config.api.listFollower)
      .then(function (response: Response) {
        if (response.data) {
          this.listFollower = response.data
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
