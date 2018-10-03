<template>
  <div id="login-page">
    <div class="container">
      <div id="login-form" v-show="!isSuccess">
        <div class="animated fadeInUp">
          <form @submit.prevent="login">
            <div class="form-group">
              <input type="text" class="form-control" name="email" placeholder="Your Email" v-model="email" v-validate="'required|email'" data-vv-delay="1000" />

              <p v-show="errors.has('email')" class="text-white mt-2">{{ errors.first('email') }}</p>
            </div>

            <div class="form-group">
              <input type="password" class="form-control" name="password" placeholder="Password" v-model="password" v-validate="'required|min:8'" data-vv-delay="1000" />

              <p v-show="errors.has('password')" class="text-white mt-2">{{ errors.first('password') }}</p>
            </div>

            <p v-show="message" class="text-white mt-2">{{ message }}</p>

            <div class="form-group text-center">
              <button class="btn btn-md btn-success" :disabled="disabledBtn">
                <font-awesome-icon icon="spinner" spin v-if="disabledBtn" />
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      <modal :is-success="isSuccess"></modal>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import config from '@/config'
import { Response, Params } from '@/util'

import modal from '@/components/modal/modal.vue'

const namespace: string = 'modal'

@Component({
  components: {
  modal,
  FontAwesomeIcon,
  },
  })
export default class Login extends Vue {
  @Action('setShowBackgroundModal', { namespace }) setShowBackgroundModal: any

  disabledBtn: boolean = false
  email: string = ''
  isSuccess: boolean = false
  message: string = ''
  password: string = ''

  login () {
    if (this.email && this.password) {
      interface Params {
        email: string,
        password: string
      }

      const params: Params = {
        email: this.email,
        password: this.password
      }

      this.disabledBtn = true

      axios
        .post(config.domainAddress + config.api.login, params)
        .then(function (response: Response) {
          this.setShowBackgroundModal(true)

          this.isSuccess = true
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

  #login-page {
    &:before {
      background-image: url('../assets/images/login-bg.jpg');
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

    #login-form {
      color: #fff;
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: $size-base * 30;
      z-index: 1;

      label {
        font-weight: normal;
      }
    }
  }
</style>
