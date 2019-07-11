<template>
  <div class="row" v-if="userFollowing && userFollowing.listUsers">
    <div v-for="(follower, index) in userFollowing.listUsers" :key="index"
    class="col-12 col-md-6">
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

          <a href="#" class="badge badge-pill badge-outline"
            @click.prevent="unfollow(follower.username)">
            <font-awesome-icon icon="check" class="mr-1" />

            Following
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

interface TypeFollower {
  full_name?: string
  avatar?: string
}

const namespaceUserFollowing: string = 'userFollowing'

@Component
export default class Following extends Vue {
  @Action('setUserFollowing', { namespace: namespaceUserFollowing }) private setUserFollowing: any
  @Action('setToUnfollow', { namespace: namespaceUserFollowing }) private setToUnfollow: any

  @Getter('userFollowing', { namespace: namespaceUserFollowing }) private userFollowing: any

  private message: string = ''
  private domain: string = `${window.location.origin}/profile/`

  private created(): void {
    axios
      .get(config.api.listFollower)
      .then(function (response: Response) {
        if (response.data) {
          this.setUserFollowing(response.data)
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

  private unfollow(username: string): void {
    axios
      .put(config.api.unFollow + username, {})
      .then(function (response: Response) {
        this.setToUnfollow(username)
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.$toasted.error('Error happened!!!')
        }
      }.bind(this))
  }
}
</script>
