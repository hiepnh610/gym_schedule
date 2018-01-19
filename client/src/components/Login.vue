<template>
  <div id="login-page">
    <div class="container">
      <div id="login-form">
        <div class="animated bounceIn">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Your Email" v-model="email" v-validate="'required|email'" data-vv-delay="1000" />

            <p v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</p>
          </div>

          <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" v-model="password" v-validate="'required|min:8'" data-vv-delay="1000" />

            <p v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</p>
          </div>

          <div class="form-group">
            <label for="remember-me"><input type="checkbox" id="remember-me" /> Remember me</label>
          </div>

          <div class="form-group">
            <button class="btn btn-md btn-success" @click="login" :disabled="disabledBtn">
              <i class="fa fa-fw fa-spinner fa-spin" aria-hidden="true" v-if="disabledBtn"></i>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
export default {
  data () {
    return {
      email: '',
      password: '',
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
          this.disabledBtn = false

          console.log(response)
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
    background-image: url('../assets/images/login-bg.jpg');
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