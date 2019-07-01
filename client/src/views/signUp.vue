<template>
  <div id="sign-up" v-if="!isLoading">
    <div class="container">
      <div id="sign-up-form">
        <div class="row justify-content-md-center">
          <div class="col-12 col-md-10 col-lg-6">
            <div class="animated fadeInUp">
              <form @submit.prevent="signUp">
                <div class="form-group input-group-lg">
                  <input type="text" class="form-control" name="email" placeholder="Email" v-model="email" />

                  <p class="text-white mt-2" v-if="emailMessage">{{ emailMessage }}</p>
                </div>

                <div class="form-group input-group-lg">
                  <input type="text" class="form-control" name="username" placeholder="Username" v-model="userName" />

                  <p class="text-white mt-2" v-if="userNameMessage">{{ userNameMessage }}</p>
                </div>

                <div class="form-group input-group-lg">
                  <input type="text" class="form-control" placeholder="Full Name" v-model="fullName" />

                  <p class="text-white mt-2" v-if="fullNameMessage">{{ fullNameMessage }}</p>
                </div>

                <div class="form-group input-group-lg">
                  <input type="password" class="form-control" name="password" placeholder="Password" v-model="password" />

                  <p class="text-white mt-2" v-if="passwordMessage">{{ passwordMessage }}</p>
                </div>

                <div class="form-group input-group-lg">
                  <input type="password" class="form-control" name="re-password" placeholder="Confirm Password" v-model="confirmPassword" />

                  <p class="text-white mt-2" v-if="confirmPasswordMessage">{{ confirmPasswordMessage }}</p>
                </div>

                <p v-show="message" class="text-white mt-2">{{ message }}</p>

                <div class="form-group text-center">
                  <button class="btn btn-lg btn-primary" :disabled="disabledBtn">
                    <font-awesome-icon icon="spinner" spin v-if="disabledBtn" />
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <loading v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import router from '@/router'
import config from '@/config'
import { Response, setLoading } from '@/util'

import Loading from '@/components/loading/loading.vue'

interface ParamsSignUp {
  email: string
  'full_name': string
  password: string
  'confirm_password': string
  username: string
}

const namespaceUser: string = 'user'
const namespaceAuth: string = 'auth'

@Component({
  components: {
  FontAwesomeIcon,
  Loading
  }
  })
export default class SignUp extends Vue {
  @Action('setUser', { namespace: namespaceUser }) private setUser: any

  @Action('setToken', { namespace: namespaceAuth }) private setToken: any
  @Action('setVerified', { namespace: namespaceAuth }) private setVerified: any

  private disabledBtn: boolean = false
  private email: string = ''
  private fullName: string = ''
  private userName: string = ''
  private message: string = ''
  private password: string = ''
  private confirmPassword: string = ''
  private isLoading: boolean = true
  private emailMessage: string = ''
  private userNameMessage: string = ''
  private fullNameMessage: string = ''
  private passwordMessage: string = ''
  private confirmPasswordMessage: string = ''

  private signUp () {
    this.emailMessage = ''
    this.userNameMessage = ''
    this.passwordMessage = ''
    this.confirmPasswordMessage = ''

    if (!this.email) {
      this.emailMessage = 'The email field cannot be blank.'

      return
    } else if (!this.userName) {
      this.userNameMessage = 'The username field cannot be blank.'

      return
    } else if (this.userName.length < 8) {
      this.userNameMessage = 'The username field must be at least 8 characters.'

      return
    } else if (!this.password) {
      this.passwordMessage = 'The password cannot be blank.'

      return
    } else if (this.password.length < 8) {
      this.passwordMessage = 'The password field must be at least 8 characters.'

      return
    } else if (!this.confirmPassword) {
      this.confirmPasswordMessage = 'The password cannot be blank.'

      return
    } else if (this.confirmPassword.length < 8) {
      this.confirmPasswordMessage = 'The password field must be at least 8 characters.'

      return
    } else if (this.email && this.fullName && this.password) {
      const params: ParamsSignUp = {
        email: this.email,
        full_name: this.fullName,
        password: this.password,
        confirm_password: this.confirmPassword,
        username: this.userName
      }

      this.disabledBtn = true

      axios
        .post(config.api.signUp, params)
        .then(function (response: Response) {
          this.$session.start()
          this.$session.set('token', response.data.token)
          this.$session.set('verified', response.data.verified)
          this.$session.set('username', response.data.username)

          this.setUser(response.data)
          this.setToken(response.data.token)
          this.setVerified(response.data.verified)
          this.disabledBtn = true

          router.push('news-feed')
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

  private mounted () {
    setLoading(this, false)
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/_sign-up.scss";
</style>
