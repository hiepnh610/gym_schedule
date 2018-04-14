<template>
  <div id="sign-up-page">
    <div class="container">
      <div id="sign-up-form" v-show="!isSuccess">
        <div class="animated bounceIn">
          <form @submit.prevent="signUp">
            <div class="form-group">
              <input type="text" class="form-control" name="email" placeholder="Your Email" v-model="email" v-validate="'required|email'" data-vv-delay="1000" />

              <p v-show="errors.has('email')" class="text-white m-t-10">{{ errors.first('email') }}</p>

              <p v-show="isError" class="text-white m-t-10">{{ errContent }}</p>
            </div>

            <div class="form-group">
              <input type="text" class="form-control" placeholder="Full Name" v-model="fullName" />
            </div>

            <div class="form-group">
              <input type="password" class="form-control" name="password" placeholder="Password" v-validate="'required|min:8'" data-vv-delay="1000" v-model="password" />

              <p v-show="errors.has('password')" class="text-white m-t-10">{{ errors.first('password') }}</p>
            </div>

            <div class="form-group">
              <input type="password" class="form-control" name="re-password" placeholder="Password Confirm" v-validate="'required|confirmed:password'" data-vv-delay="1000" v-model="password_confirm" />

              <p v-show="errors.has('re-password')" class="text-white m-t-10">{{ errors.first('re-password') }}</p>
            </div>

            <div class="form-group text-center">
              <button class="btn btn-md btn-primary" :disabled="disabledBtn">
                <i class="fa fa-fw fa-spinner fa-spin" aria-hidden="true" v-if="disabledBtn"></i>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>

      <app-modal :is-success="isSuccess" :is-sign-up="true"></app-modal>
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
      fullName: '',
      password: '',
      password_confirm: '',
      isError: false,
      isSuccess: false,
      disabledBtn: false,
      errContent: ''
    }
  },

  methods: {
    signUp () {
      if (this.email && this.fullName && this.password) {
        const params = {
          email: this.email,
          fullName: this.fullName,
          password: this.password,
          password_confirm: this.password_confirm
        }

        this.disabledBtn = true

        axios.post(config.domainAddress + config.api.sign_up, params)
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
          this.isError = true

          if (error.response && error.response.data && error.response.data.message) {
            this.errContent = error.response.data.message
          } else {
            this.errContent = 'Error happened.'
          }
        }.bind(this))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins.scss';

#sign-up-page {
  &:before {
    background-image: url('../../assets/images/sign-up-bg.jpg');
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

  #sign-up-form {
    color: #fff;
    left: 50%;
    position: absolute;
    top: 50%;
    width: 400px;
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