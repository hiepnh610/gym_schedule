<template>
  <div class="account px-4 pt-4 bg-white border border-radius">
    <h4>Change password</h4>

    <hr />

    <form>
      <div class="form-group input-group-lg">
        <label for="profile-old-password">Old password</label>

        <input id="profile-old-password" type="password" class="form-control" v-model="userInfo.currentPassword" />
      </div>

      <div class="form-group input-group-lg">
        <label for="profile-new-password">New password</label>

        <input id="profile-new-password" type="password" class="form-control" v-model="userInfo.newPassword" />
      </div>

      <div class="form-group input-group-lg">
        <label for="profile-confirm-new-password">Confirm new password</label>

        <input id="profile-confirm-new-password" type="password" class="form-control" v-model="userInfo.confirmNewPassword" />
      </div>

      <div class="form-group">
        <button class="btn btn-md btn-primary" @click.prevent="userUpdate(user._id)">
          Update password
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

const namespaceUser: string = 'user'

interface UserInfo {
  confirmNewPassword?: string
  currentPassword?: string
  newPassword?: string
}

@Component
export default class Account extends Vue {
  @Getter('user', { namespace: namespaceUser }) private user: any

  private userInfo: UserInfo = {}

  private errContent: string = ''

  private userUpdate (id: string) {
    if (this.userInfo.newPassword === this.userInfo.confirmNewPassword) {
      const params = {
        current_password: this.userInfo.currentPassword,
        new_password: this.userInfo.newPassword
      }

      axios
        .put(config.api.modifyPassword + id, params)
        .then(function () {
          this.userInfo = {}
          this.$toasted.success('Update Successfully!!!')
        }.bind(this))
        .catch(function (error: Response) {
          if (error.response && error.response.data && error.response.data.message) {
            this.errContent = error.response.data.message
          } else {
            this.errContent = 'Error happened.'
          }

          this.$toasted.error('Error happened!!!')
        }.bind(this))
    } else {
      this.$toasted.error('The password does not match.')
    }
  }
}
</script>
