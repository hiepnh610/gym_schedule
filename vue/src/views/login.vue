<template>
  <div id="login">
    <div class="container">
      <div id="login-form">
        <div class="row justify-content-md-center">
          <div class="col-12 col-md-10 col-lg-6">
            <div class="animated fadeInUp" v-show="!isSuccess">
              <form @submit.prevent="login">
                <div class="form-group input-group-lg">
                  <input type="text" class="form-control" name="email" placeholder="Email" v-model="email" v-validate="'required|email'" data-vv-delay="1000" />

                  <p v-show="errors.has('email')" class="text-white mt-2">{{ errors.first('email') }}</p>
                </div>

                <div class="form-group input-group-lg">
                  <input type="password" class="form-control" name="password" placeholder="Password" v-model="password" v-validate="'required|min:8'" data-vv-delay="1000" />

                  <p v-show="errors.has('password')" class="text-white mt-2">{{ errors.first('password') }}</p>
                </div>

                <p v-show="message" class="text-white mt-2">{{ message }}</p>

                <div class="form-group text-center">
                  <button class="btn btn-lg btn-primary" :disabled="disabledBtn">
                    <font-awesome-icon icon="spinner" spin v-if="disabledBtn" />
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
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
import { Response } from '@/util'

import modal from '@/components/modal/modal.vue'

interface ParamsLogin {
  email: string;
  password: string;
}

const namespaceModal: string = 'modal'

@Component({
  components: {
  modal,
  FontAwesomeIcon,
  },
  })
export default class Login extends Vue {
  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any

  disabledBtn: boolean = false
  email: string = ''
  isSuccess: boolean = false
  message: string = ''
  password: string = ''

  login () {
    if (this.email && this.password) {
      const params: ParamsLogin = {
        email: this.email,
        password: this.password
      }

      this.disabledBtn = true

      axios
        .post(config.domainAddress + config.api.login, params)
        .then(function (response: Response) {
          this.setShowModalBackdrop(true)

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
