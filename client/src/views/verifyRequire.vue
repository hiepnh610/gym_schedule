<template>
  <div class="container text-center">
    <div class="verify-page">
      <div class="verify-content">
        <div class="row justify-content-center">
          <div class="col-12 col-md-10" v-if="!isSuccess">
            <h2>Thank you for registering. Please verify your account.</h2>

            <p>In order to participate in GymSchedule. An email has been sent to <span class="text-primary">{{ user.email }}</span> with a link to verify your account. If you have not received the email after a few minutes, please check your spam folder or <a href="#" class="text-primary" @click.prevent="resendVerification"><u>resend the verification email</u></a></p>
          </div>

          <div class="col-12 col-md-10" v-else>
            <h2>
              <font-awesome-icon icon="check-circle" class="text-primary mr-2" />

              A verification link has been sent to your email account
            </h2>

            <p>Please click on the link that has just been sent to your email account to verify your email and continue the registration process.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

import axios from 'axios'

import config from '@/config'
import { Response, ParamEmailVerification } from '@/util'

const namespaceUser: string = 'user'
const namespaceAuth: string = 'auth'

@Component
export default class VerifyRequire extends Vue {
  @Getter('user', { namespace: namespaceUser }) private user: any

  @Getter('token', { namespace: namespaceAuth }) private token: any

  private isSuccess: boolean = false

  private resendVerification (): void {
    const token: string = this.token
    const params: ParamEmailVerification = { token }

    axios
      .post(config.api.resendVerificationMail, params)
      .then(function (response: Response) {
        this.isSuccess = true
        this.$toasted.success('Email has been sent.')
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.$toasted.error(error.response.data.message)
        } else {
          this.$toasted.error('Error happened!!!')
        }
      }.bind(this))
  }
}
</script>

<style lang="scss" scoped>
.verify-page {
  height: 100vh;
  position: relative;

  .verify-content {
    left: 0;
    position: absolute;
    top: 50%;
    width: 100%;
    @include translate(0, -50%);
  }
}
</style>
