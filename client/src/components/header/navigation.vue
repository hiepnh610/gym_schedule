<template>
  <header id="main-header" class="fixed-top">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <router-link :to="{ name: 'NewsFeed' }" class="navbar-brand text-uppercase" id="main-logo">
          <h1>Gym Schedule</h1>
        </router-link>

        <div id="main-nav" class="collapse navbar-collapse" v-if="!loginStatus">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{ name: 'SignUp' }" class="nav-link">Sign Up</router-link>
            </li>

            <li class="nav-item">
              <a class="nav-link">/</a>
            </li>

            <li class="nav-item">
              <router-link :to="{ name: 'Login' }" class="nav-link">Login</router-link>
            </li>
          </ul>
        </div>

        <div class="d-flex align-items-center" v-else>
          <router-link :to="{ name: 'Messages' }" class="text-capitalize text-white mr-2 d-flex">
            <font-awesome-icon icon="comments" class="text-white mr-3" />
          </router-link>

          <router-link :to="{ name: 'Plans' }" class="text-capitalize text-white mr-2 d-flex">
            <font-awesome-icon icon="file-alt" class="text-white mr-3" />
          </router-link>

          <router-link :to="{ name: 'AllCalendar' }" class="text-capitalize text-white mr-2 d-flex">
            <font-awesome-icon icon="calendar-alt" class="text-white mr-4" />
          </router-link>

          <div class="avatar mr-2 d-flex align-items-start">
            <img :src="avatar" alt="" v-if="avatar" />

            <font-awesome-icon icon="user" v-else />
          </div>

          <router-link :to="{ name: 'Profile', params: { user: user.username } }" v-if="user.username" class="text-capitalize text-white mr-2 d-flex">
            <span v-text="user.full_name"></span>
          </router-link>

          <div class="dropdown">
            <div class="text-white dropdown-toggle">
              <font-awesome-icon icon="caret-down" />
            </div>

            <div class="dropdown-menu">
              <router-link :to="{ name: 'SettingProfile' }" class="dropdown-item">Settings</router-link>

              <a class="dropdown-item" href="#" @click.prevent="logout">Sign Out</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import router from '@/router'

const namespaceAvatar: string = 'avatar'
const namespaceUser: string = 'user'
const namespaceloginStatus: string = 'loginStatus'

@Component({
  components: {
  FontAwesomeIcon
  }
  })
export default class Navigation extends Vue {
  @Getter('loginStatus', { namespace: namespaceloginStatus }) private loginStatus: any
  @Action('setLoginStatus', { namespace: namespaceloginStatus }) private setLoginStatus: any

  @Action('setAvatar', { namespace: namespaceAvatar }) private setAvatar: any
  @Getter('avatar', { namespace: namespaceAvatar }) private avatar: any

  @Getter('user', { namespace: namespaceUser }) private user: any

  private created () {
    const $this: any = this

    if ($this.$session.get('token')) { this.setLoginStatus(true) }
  }

  private logout () {
    const $this: any = this

    $this.$session.destroy()
    router.push('/')
    $this.setAvatar('')
    this.setLoginStatus(false)
  }
}
</script>
