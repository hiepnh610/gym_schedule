<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">Gym Schedule</a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="main-nav">
        <ul class="navbar-nav mr-auto" v-if="!isLogin">
          <li class="nav-item">
            <a class="nav-link" href="/sign-up">Sign Up</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/">Login</a>
          </li>
        </ul>

        <ul class="navbar-nav mr-auto pull-right" v-else>
          <li class="nav-item">
            <span class="text-white mr-2" v-text="nameDisplay"></span>

            <a class="nav-link" href="#" @click.prevent="logout">
              <font-awesome-icon icon="sign-out-alt" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'AppNav',

  components: { FontAwesomeIcon },

  data () {
    return {
      isLogin: false,
      nameDisplay: String
    }
  },

  mounted () {
    if (this.$session.exists()) {
      this.isLogin = true
      this.nameDisplay = this.$session.get('name')
    }
  },

  methods: {
    logout () {
      this.$session.destroy()
      this.$router.push('/sign-up')
      this.isLogin = false
    }
  }
}
</script>

<style lang="scss"></style>