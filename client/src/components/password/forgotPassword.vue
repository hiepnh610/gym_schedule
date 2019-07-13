<template>
  <div id="forgot-password">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-6">
          <div class="px-4 pt-4 bg-white border border-radius">
            <h2 class="mb-1">Reset your password</h2>

            <form v-if="!resetSuccess" @submit.prevent="forgotPassword">
              <p class="text-muted">Enter your email address and we will send you a link to reset your password.</p>

              <div class="form-group input-group-lg">
                <input type="text" class="form-control" name="email" placeholder="Email" v-model="email" />
              </div>

              <div class="form-group">
                <button class="btn btn-md btn-primary px-4" :disabled="disabledBtn">
                  <font-awesome-icon icon="spinner" spin v-if="disabledBtn" />

                  Send password reset email
                </button>
              </div>
            </form>

            <div v-else>
              <p>Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.</p>

              <div class="form-group">
                <button class="btn btn-md btn-light px-4">Return to sign in</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

import router from '@/router'
import config from '@/config'
import { Response, ParamForgotPassword } from '@/util'

@Component
export default class ResetPassword extends Vue {
  private email: string = ''
  private resetSuccess: boolean = false
  private disabledBtn: boolean = false

  private forgotPassword (): void {
    this.disabledBtn = true

    const params: ParamForgotPassword = {
      email: this.email
    }

    axios
      .post(config.api.forgotPassword, params)
      .then(function (response: Response) {
        this.resetSuccess = true
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }

        this.disabledBtn = false
      }.bind(this))
  }
}
</script>

<style lang="scss" scoped>
#forgot-password {
  padding-top: 100px;
}
</style>
