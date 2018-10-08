<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="header">
    <div class="container">
      <a class="navbar-brand text-uppercase" href="/">Gym Schedule</a>

      <div class="collapse navbar-collapse" id="main-nav" v-if="!isLogin">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/sign-up">Sign Up</a>
          </li>

          <li class="nav-item">
            <a class="nav-link">/</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/">Login</a>
          </li>
        </ul>
      </div>

      <div class="pull-right" v-else>
        <div class="avatar mr-2">
          <img :src="avatar" alt="" class="rounded" v-if="avatar" />

          <img src="../../assets/images/avatar-default.png" alt="" class="rounded" v-else />
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

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const namespaceAvatar: string = 'avatar'

@Component({
  components: {
  FontAwesomeIcon,
  },
  })
export default class Navigation extends Vue {
  @Getter('avatar', { namespace: namespaceAvatar }) avatar: any

  isLogin: boolean = false
  nameDisplay!: string

  mounted () {
    const _this: any = this

    if (_this.$session.exists()) {
      this.isLogin = true
      this.nameDisplay = _this.$session.get('name')
    }
  }

  logout () {
    const _this: any = this

    _this.$session.destroy()
    _this.$router.push('/sign-up')
    this.isLogin = false
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variables.scss';
  @import '../../assets/scss/mixins.scss';

  #header {
    background: rgba($header-bg-color, .6);
  }

  #main-nav {
    .navbar-nav {
      margin-left: auto;

      a {
        color: $header-text-color;
        padding-left: $header-size / 4;
        padding-right: $header-size / 4;
      }
    }
  }

  .avatar {
    display: inline-block;
    max-width: $avatar-header * 2;
  }
</style>
