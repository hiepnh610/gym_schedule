<template>
  <nav class="main-menu">
    <div class="container text-center">
      <div class="row">
        <div class="col-xs-12 col-md-4 col-md-offset-4">
          <div class="main-logo">
            <h1>
              <a href="/">
                Gym Schedule
              </a>
            </h1>
          </div>
        </div>

        <div class="col-xs-12 col-md-2 pull-right m-t-5">
          <span v-if="isLogin">
            <a href="sign-up" class="btn btn-sm btn-success">Sign Up</a>
            <a href="login" class="btn btn-sm btn-warning">Login</a>
          </span>

          <a class="btn btn-sm btn-warning" v-else @click="logout">Logout</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNav',
  data () {
    return {
      isLogin: true
    }
  },
  mounted () {
    if (this.$session.exists()) {
      this.isLogin = false
    }
  },
  methods: {
    logout () {
      this.$session.destroy()
      this.$router.push('sign-up')
      this.isLogin = true
    }
  }
}
</script>

<style lang="scss" scoped>
.main-menu {
  left: 0;
  padding: 20px 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;

  .main-logo {
    h1 {
      margin: 0;

      a {
        color: #fff;
        text-transform: uppercase;

        &:hover {
          text-decoration: none;
        }
      }
    }
  }
}
</style>