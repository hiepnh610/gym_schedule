<template>
  <div id="sign-up-page">
    <div class="container">
      <div id="sign-up-form">
        <form action="#">
          <div class="form-group">
            <input type="text" class="form-control" name="email" placeholder="Your Email" v-validate="'required|email'" data-vv-delay="1000" />

            <p v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</p>
          </div>

          <div class="form-group">
            <input type="text" class="form-control" placeholder="Full Name" />
          </div>

          <div class="form-group">
            <input type="password" class="form-control" name="password" placeholder="Password" v-validate="'required|min:8'" data-vv-delay="1000" />

            <p v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</p>
          </div>

          <div class="form-group">
            <input type="password" class="form-control" name="re-password" placeholder="Password Confirm" v-validate="'required|confirmed:password'" data-vv-delay="1000" />

            <p v-show="errors.has('re-password')" class="text-danger">{{ errors.first('re-password') }}</p>
          </div>

          <div class="form-group">
            <button class="btn btn-md btn-success">Sign Up</button>
          </div>
        </form>

        <hr />

        <a href="/login" class="btn btn-md btn-info">Login</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },

    methods: {
    }
  }
</script>

<style lang="scss" scoped>
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
    transform: translate(-50%, -50%);
    width: 400px;
    z-index: 1;

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