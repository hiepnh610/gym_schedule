<template>
  <div id="login-page">
    <div class="container">
      <div id="login-form" v-show="!isSuccess">
        <div class="animated bounceIn">
          <form @submit.prevent="login">
            <div class="form-group">
              <input type="text" class="form-control" name="email" placeholder="Your Email" v-model="email" v-validate="'required|email'" data-vv-delay="1000" />

              <p v-show="errors.has('email')" class="text-white m-t-10">{{ errors.first('email') }}</p>
            </div>

            <div class="form-group">
              <input type="password" class="form-control" name="password" placeholder="Password" v-model="password" v-validate="'required|min:8'" data-vv-delay="1000" />

              <p v-show="errors.has('password')" class="text-white m-t-10">{{ errors.first('password') }}</p>
            </div>

            <div class="form-group text-center">
              <button class="btn btn-md btn-primary" :disabled="disabledBtn">
                <i class="fa fa-fw fa-spinner fa-spin" aria-hidden="true" v-if="disabledBtn"></i>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      <app-modal :is-success="isSuccess"></app-modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'

import AppNav from './AppNav.vue'
import AppModal from '../modal/AppModal.vue'

export default {
  components: { AppNav, AppModal },
  data () {
    return {
      email: '',
      password: '',
      isSuccess: false,
      disabledBtn: false
    }
  },

  methods: {
    login () {
      if (this.email && this.password) {
        const params = {
          email: this.email,
          password: this.password
        }

        this.disabledBtn = true

        axios.post(config.domainAddress + config.api.login, params)
        .then(function (response) {
          this.isSuccess = true
          this.disabledBtn = false
          this.$store.dispatch('setShowBackgroundModal', true)

          this.$session.start()
          this.$session.set('name', response.data.name)
          this.$session.set('email', response.data.email)
          this.$session.set('id', response.data.id)
          this.$session.set('authenticate', response.data.authenticate)
        }.bind(this))
        .catch(function (error) {
          this.disabledBtn = false

          if (error) console.log(error.response.data)
        }.bind(this))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#login-page {
  &:before {
    background-image: url('../../assets/images/login-bg.jpg');
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    bottom: 0;
    content: '';
    height: 100%;
    left: 0;
    min-height: 100%;
    padding: 60px 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
  }

  &:after {
    background: rgba(#000, .5);
    bottom: 0;
    content: '';
    height: 100%;
    left: 0;
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
    width: 400px;
    z-index: 1;

    label {
      font-weight: normal;
    }
  }
}
</style>