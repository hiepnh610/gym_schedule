<template>
  <div id="sign-up-page">
    <div class="container">
      <div id="sign-up-form">
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
          <button class="btn btn-md btn-success" @click="signUp">Sign Up</button>
        </div>
      </div>

      <div class="modal fade in" tabindex="-1" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">Modal title</h4>
            </div>
            <div class="modal-body">
              <p>One fine body&hellip;</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import api from '@/config'
const domainAddress = 'http://localhost:3000'
export default {
  data () {
    return {
      email: '',
      fullName: '',
      password: '',
      password_confirm: '',
      existEmail: false
    }
  },

  methods: {
    signUp () {
      if (this.email && this.fullName && this.password) {
        const params = {
          email: this.email,
          full_name: this.fullName,
          password: this.password,
          password_confirm: this.password_confirm
        }

        axios.post(domainAddress + api.sign_up, params)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
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
    background-image: url('../assets/images/sign-up-bg.jpeg');
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
    top: 50%;
    @include translate(0, -50%);
  }
}
</style>