<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand text-uppercase" href="/">Gym Schedule</a>

      <div class="collapse navbar-collapse" id="main-nav" v-if="!isLogin">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="/sign-up">Sign Up</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/">Login</a>
          </li>
        </ul>
      </div>

      <div class="pull-right" v-else>
        <div class="avatar mr-2">
          <img :src="getAvatar" alt="" class="rounded border" v-if="getAvatar" />

          <img src="../../assets/images/avatar-default.png" alt="" class="rounded border" v-else />
        </div>

        <router-link to="/settings/profile" class="text-capitalize text-white mr-2">
          <span v-text="nameDisplay"></span>
        </router-link>

        <a href="#" class="text-white" @click.prevent="logout">
          <font-awesome-icon icon="sign-out-alt" />
        </a>
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
      nameDisplay: String,
      avatar: ''
    }
  },

  mounted () {
    if (this.$session.exists()) {
      this.isLogin = true
      this.nameDisplay = this.$session.get('name')
    }
  },

  computed: {
    getAvatar () {
      return this.$store.getters.avatar
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

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
@import '../../assets/scss/mixins.scss';

  .avatar {
    display: inline-block;
    max-width: $avatar-header * 2;
  }
</style>