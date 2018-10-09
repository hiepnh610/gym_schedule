<template>
  <div id="sign-up-page">
    <div class="container">
      <div id="sign-up-form" v-show="!isSuccess">
        <div class="animated fadeInUp">
          <form @submit.prevent="signUp">
            <div class="form-group">
              <input type="text" class="form-control" name="email" placeholder="Your Email" v-model="email" v-validate="'required|email'" data-vv-delay="1000" />

              <p v-show="errors.has('email')" class="text-white mt-2">{{ errors.first('email') }}</p>
            </div>

            <div class="form-group">
              <input type="text" class="form-control" placeholder="Full Name" v-model="fullName" />
            </div>

            <div class="form-group">
              <input type="password" class="form-control" name="password" placeholder="Password" v-validate="'required|min:8'" data-vv-delay="1000" ref="passwordRef" v-model="password" />

              <p v-show="errors.has('password')" class="text-white mt-2">{{ errors.first('password') }}</p>
            </div>

            <div class="form-group">
              <input type="password" class="form-control" name="re-password" placeholder="Password Confirm" v-validate="'required|confirmed:passwordRef'" data-vv-delay="1000" v-model="passwordConfirm" />

              <p v-show="errors.has('re-password')" class="text-white mt-2">{{ errors.first('re-password') }}</p>
            </div>

            <p v-show="message" class="text-white mt-2">{{ message }}</p>

            <div class="form-group text-center">
              <button class="btn btn-md btn-success" :disabled="disabledBtn">
                <font-awesome-icon icon="spinner" spin v-if="disabledBtn" />
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>

      <modal :is-success="isSuccess" :is-sign-up="isSignUp"></modal>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

import modal from '@/components/modal/modal.vue'

interface ParamsSignUp {
  email: string;
  full_name: string;
  password: string;
  password_confirm: string;
}

const namespaceModal: string = 'modal'

@Component({
  components: {
  modal,
  FontAwesomeIcon,
  },
  })
export default class SignUp extends Vue {
  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any

  disabledBtn: boolean = false
  email: string = ''
  fullName: string = ''
  isSignUp: boolean = false
  isSuccess: boolean = false
  message: string = ''
  password: string = ''
  passwordConfirm: string = ''

  signUp () {
    if (this.email && this.fullName && this.password) {
      const params: ParamsSignUp = {
        email: this.email,
        full_name: this.fullName,
        password: this.password,
        password_confirm: this.passwordConfirm
      }

      this.disabledBtn = true

      axios
        .post(config.domainAddress + config.api.signUp, params)
        .then(function (response: Response) {
          this.setShowModalBackdrop(true)

          this.isSuccess = true
          this.isSignUp = true
          this.disabledBtn = false

          this.$session.start()
          this.$session.set('name', response.data.name)
          this.$session.set('email', response.data.email)
          this.$session.set('id', response.data.id)
          this.$session.set('authenticate', response.data.authenticate)
        }.bind(this))
        .catch(function (error: Response) {
          this.disabledBtn = false

          if (error.response && error.response.data && error.response.data.message) {
            this.message = error.response.data.message
          } else {
            this.message = 'Error happened.'
          }
        }.bind(this))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';
  @import '@/assets/scss/mixins.scss';

  #sign-up-page {
    &:before {
      background-image: url('../assets/images/sign-up-bg.jpg');
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: cover;
      bottom: 0;
      content: '';
      height: 100%;
      left: 0;
      min-height: 100%;
      padding: $size-base * 4 0;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
    }

    &:after {
      background: rgba(#000, .075);
      bottom: 0;
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
    }

    #sign-up-form {
      color: #fff;
      left: 50%;
      position: absolute;
      top: 50%;
      width: $size-base * 30;
      z-index: 1;
      @include translate(-50%, -50%);

      label {
        font-weight: normal;
      }

      a {
        color: #fff;

        &:hover {
          text-decoration: none;
        }
      }
    }
  }
</style>
