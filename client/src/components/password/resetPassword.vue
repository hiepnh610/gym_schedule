<template>
  <div id="reset-password">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-6">
          <form class="px-4 pt-4 bg-white border border-radius" @submit.prevent="resetPassword">
            <div class="form-group input-group-lg">
              <label for="reset-user-password">New password</label>

              <input id="reset-user-password" type="password" class="form-control" v-model="password" />
            </div>

            <div class="form-group input-group-lg">
              <label for="confirm-reset-user-password">Confirm new password</label>

              <input id="confirm-reset-user-password" type="password" class="form-control" v-model="confirmPassword" />
            </div>

            <div class="form-group" v-if="message">
              <p>{{ message }}</p>
            </div>

            <div class="form-group">
              <button class="btn btn-md btn-primary" :disabled="disabledBtn">
                <font-awesome-icon icon="spinner" spin v-if="disabledBtn" />
                Reset password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import axios from 'axios'

import router from '@/router'
import config from '@/config'
import { Response, ParamResetPassword } from '@/util'

@Component({})
export default class ResetPassword extends Vue {
  private password: string = ''
  private confirmPassword: string = ''
  private message: string = ''
  private disabledBtn: boolean = false

  private resetPassword (): void {
    if (this.password !== this.confirmPassword) {
      this.message = 'Password does not match the confirm password.'

      return
    }

    if (this.password.length < 8) {
      this.message = 'The password field must be at least 8 characters.'

      return
    }

    this.message = ''
    this.disabledBtn = true

    const params: ParamResetPassword = {
      confirmPassword: this.confirmPassword,
      password: this.password,
      token: this.$route.params.token
    }

    axios
      .put(config.api.resetPassword, params)
      .then((response: Response) => {
        router.push({
          name: 'Login',
          params: {
            message: 'New password set successfully.'
          }
        })
      })
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.$toasted.error('Error happened!!!')
        }

        this.disabledBtn = false
      }.bind(this))
  }
}
</script>

<style lang="scss" scoped>
#reset-password {
  padding-top: 100px;
}
</style>
