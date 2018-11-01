<template>
  <header id="main-header" class="fixed-top">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <a id="main-logo" class="navbar-brand text-uppercase" href="/">
          <h1>Gym Schedule</h1>
        </a>

        <div id="main-nav" class="collapse navbar-collapse" v-if="!isLogin">
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

        <div class="d-flex align-items-center" v-else>
          <div class="avatar mr-2 d-flex align-items-start">
            <img :src="avatar" alt="" v-if="avatar" />

            <font-awesome-icon icon="user" v-else />
          </div>

          <router-link to="/" class="text-capitalize text-white mr-2 d-flex">
            <span v-text="nameDisplay"></span>
          </router-link>

          <div class="dropdown">
            <a href="#" class="text-white dropdown-toggle" @click.prevent="openDropDown" v-click-outside="closeDropDown">
              <font-awesome-icon icon="caret-down" />
            </a>

            <div class="dropdown-menu" :class="{ show: isDropDown }">
              <router-link to="/settings/profile" class="dropdown-item">Settings</router-link>

              <a class="dropdown-item" href="#" @click.prevent="logout">Sign Out</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ClickOutside from 'vue-click-outside'

const namespaceAvatar: string = 'avatar'

@Component({
  components: {
  FontAwesomeIcon,
  },
  directives: {
  ClickOutside
  },
  })
export default class Navigation extends Vue {
  @Getter('avatar', { namespace: namespaceAvatar }) avatar: any

  isLogin: boolean = false
  nameDisplay!: string
  isDropDown: boolean = false

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
    window.location.href = location.origin
    this.isLogin = false
  }

  openDropDown () {
    if (this.isDropDown) {
      this.isDropDown = false
    } else {
      this.isDropDown = true
    }
  }

  closeDropDown () {
    this.isDropDown = false
  }
}
</script>
