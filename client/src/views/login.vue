<template>
  <div id="login" v-if="!isLoading">
    <div class="container">
      <div id="login-form">
        <div class="row justify-content-md-center">
          <div class="col-12 col-md-10 col-lg-6">
            <div class="animated fadeInUp">
              <form @submit.prevent="login">
                <div class="form-group" v-if="messageResetPassword">
                  <p class="text-white">{{ messageResetPassword }}</p>
                </div>

                <div class="form-group input-group-lg">
                  <input type="text" class="form-control" name="username" placeholder="Username" v-model="username" />

                  <p class="text-white mt-2" v-if="userNameMessage">{{ userNameMessage }}</p>
                </div>

                <div class="form-group input-group-lg">
                  <input type="password" class="form-control" name="password" placeholder="Password" v-model="password" />

                  <p class="text-white mt-2" v-if="passwordMessage">{{ passwordMessage }}</p>
                </div>

                <div class="form-group">
                  <router-link :to="{ name: 'ForgotPassword' }" class="text-white">Forgot password?</router-link>
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
    </div>
  </div>

  <loading v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import router from '@/router'
import config from '@/config'
import { Response, setLoading } from '@/util'

import Loading from '@/components/loading/loading.vue'

interface ParamsLogin {
  username: string
  password: string
}

const namespaceUser: string = 'user'
const namespaceAvatar: string = 'avatar'
const namespaceAuth: string = 'auth'

@Component({
  components: {
  FontAwesomeIcon,
  Loading
  }
  })
export default class Login extends Vue {
  @Action('setUser', { namespace: namespaceUser }) private setUser: any

  @Action('setAvatar', { namespace: namespaceAvatar }) private setAvatar: any

  @Action('setToken', { namespace: namespaceAuth }) private setToken: any
  @Action('setVerified', { namespace: namespaceAuth }) private setVerified: any

  private disabledBtn: boolean = false
  private username: string = ''
  private message: string = ''
  private password: string = ''
  private isLoading: boolean = true
  private messageResetPassword: string = ''
  private userNameMessage: string = ''
  private passwordMessage: string = ''

  private login () {
    this.userNameMessage = ''
    this.passwordMessage = ''

    if (!this.username) {
      this.userNameMessage = 'The username field cannot be blank.'

      return
    } else if (this.username.length < 8) {
      this.userNameMessage = 'The username field must be at least 8 characters.'

      return
    } else if (!this.password) {
      this.passwordMessage = 'The password cannot be blank.'

      return
    } else if (this.password.length < 8) {
      this.passwordMessage = 'The password field must be at least 8 characters.'

      return
    } else {
      const params: ParamsLogin = {
        username: this.username,
        password: this.password
      }

      this.disabledBtn = true

      axios
        .post(config.api.login, params)
        .then(function (response: Response) {
          this.$session.start()
          this.$session.set('token', response.data.token)
          this.$session.set('verified', response.data.verified)
          this.$session.set('username', response.data.username)

          if (response.data.avatar) { this.setAvatar(response.data.avatar) }

          this.setUser(response.data)
          this.setToken(response.data.token)
          this.setVerified(response.data.verified)
          this.disabledBtn = false

          if (this.$route.params && this.$route.params.nextUrl) {
            router.push(this.$route.params.nextUrl)
          } else {
            router.push('news-feed')
          }
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

  @Watch('$route', { immediate: true, deep: true })
  private urlChanged (val: any) {
    this.messageResetPassword = val.params.message
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/_login.scss";
</style>
