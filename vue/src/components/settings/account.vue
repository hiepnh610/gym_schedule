<template>
  <div class="account">
    <div class="row">
      <div class="col-12 col-md-8">
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
            <button class="btn btn-md btn-primary" @click.prevent="userUpdate(userInfo.id)">
              Update password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

interface UserInfo {
  confirmNewPassword: string
  currentPassword: string
  id: string
  newPassword: string
}

@Component({
  components: {
  FontAwesomeIcon
  }
  })
export default class Account extends Vue {
  private userInfo: UserInfo = {
    confirmNewPassword: '',
    currentPassword: '',
    id: '',
    newPassword: ''
  }

  private errContent: string = ''

  private created () {
    const self: any = this
    this.userInfo.id = self.$session.get('id')
  }

  private userUpdate (id: string) {
    const self: any = this

    if (this.userInfo.newPassword === this.userInfo.confirmNewPassword) {
      const params = {
        current_password: this.userInfo.currentPassword,
        new_password: this.userInfo.newPassword
      }

      axios
        .put(config.api.modifyPassword + id, params)
        .then(function () {
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
      self.$toasted.error('The password does not match.')
    }
  }
}
</script>
