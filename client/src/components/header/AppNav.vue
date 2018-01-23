<template>
  <nav class="main-menu" :class="{'dark-menu': isLogin}">
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

        <div class="col-xs-12 col-md-2 pull-right m-t-10">
          <span v-if="!isLogin">
            <a href="sign-up" class="text-white">Sign Up</a>
            <span class="text-white">/</span>
            <a href="login" class="text-white">Login</a>
          </span>

          <a class="text-white" v-else @click="logout">Logout</a>
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
      isLogin: false
    }
  },
  mounted () {
    if (this.$session.exists()) {
      this.isLogin = true
    }
  },
  methods: {
    logout () {
      this.$session.destroy()
      this.$router.push('sign-up')
      this.isLogin = false
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

  &.dark-menu {
    background: rgba(#000, .8);
  }

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

  a {
    &:hover {
      color: #fff;
      cursor: pointer;
      text-decoration: none;
    }
  }
}
</style>