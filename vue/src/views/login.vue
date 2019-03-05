<template>
  <div id="login" v-if="!isLoading">
    <div class="container">
      <div id="login-form">
        <div class="row justify-content-md-center">
          <div class="col-12 col-md-10 col-lg-6">
            <div class="animated fadeInUp">
              <form @submit.prevent="login">
                <div class="form-group input-group-lg">
                  <input type="text" class="form-control" name="username" placeholder="Username" v-model="username" />
                </div>

                <div class="form-group input-group-lg">
                  <input type="password" class="form-control" name="password" placeholder="Password" v-model="password" />
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
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import config from '@/config'
import { Response, setLoading } from '@/util'

import Loading from '@/components/loading/loading.vue'

interface ParamsLogin {
  username: string;
  password: string;
}

@Component({
  components: {
  FontAwesomeIcon,
  Loading,
  },
  })
export default class Login extends Vue {
  disabledBtn: boolean = false
  username: string = ''
  message: string = ''
  password: string = ''
  isLoading: boolean = true

  login () {
    if (this.username && this.password) {
      const params: ParamsLogin = {
        username: this.username,
        password: this.password
      }

      this.disabledBtn = true

      axios
        .post(config.api.login, params)
        .then(function (response: Response) {
          window.location.href = location.origin + '/news-feed'

          this.$session.start()
          this.$session.set('name', response.data.name)
          this.$session.set('username', response.data.username)
          this.$session.set('id', response.data.id)
          this.$session.set('auth', response.data.auth)
          this.$session.set('token', response.data.token)
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

  mounted () {
    setLoading(this, false)
  }
}
</script>
