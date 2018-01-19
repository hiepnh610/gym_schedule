<template>
  <div id="sign-up-page">
    <div class="container">
      <div id="sign-up-form" v-show="!isSuccess">
        <div class="animated bounceIn">
          <div class="form-group">
            <input type="text" class="form-control" name="email" placeholder="Your Email" v-model="email" v-validate="'required|email'" data-vv-delay="1000" />

            <p v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</p>

            <p v-show="existEmail" class="text-danger">Email này đã có người sử dụng</p>
          </div>

          <div class="form-group">
            <input type="text" class="form-control" placeholder="Full Name" v-model="fullName" />
          </div>

          <div class="form-group">
            <input type="password" class="form-control" name="password" placeholder="Password" v-validate="'required|min:8'" data-vv-delay="1000" v-model="password" />

            <p v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</p>
          </div>

          <div class="form-group">
            <input type="password" class="form-control" name="re-password" placeholder="Password Confirm" v-validate="'required|confirmed:password'" data-vv-delay="1000" v-model="password_confirm" />

            <p v-show="errors.has('re-password')" class="text-danger">{{ errors.first('re-password') }}</p>
          </div>

          <div class="form-group text-center">
            <button class="btn btn-md btn-success" @click="signUp" :disabled="disabledBtn">
              <i class="fa fa-fw fa-spinner fa-spin" aria-hidden="true" v-if="disabledBtn"></i>
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <div class="modal modal-xs fade" v-show="isSuccess" :style="{ display: 'block' }" :class="{ 'in animated bounceIn': isSuccess }">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body text-center">
              <i class="fa fa-check-circle text-success" aria-hidden="true"></i>

              <h2>Success</h2>

              <p>We'll see you soon!</p>
            </div>

            <div class="modal-footer">
              <a href="dashboard" class="btn btn-md btn-block btn-success text-uppercase">ok</a>
            </div>
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
      fullName: '',
      password: '',
      password_confirm: '',
      existEmail: false,
      isSuccess: false,
      disabledBtn: false
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
        }.bind(this))
        .catch(function (error) {
          this.disabledBtn = false

          if (error.response.data.code === 11000) {
            this.existEmail = true
          }
        }.bind(this))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixins.scss';

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

  .modal {
    margin-top: -157px;
    top: 50%;

    .modal-dialog {
      margin: 0 auto;

      .modal-body {
        .fa {
          font-size: 96px;
        }
      }
    }
  }
}
</style>