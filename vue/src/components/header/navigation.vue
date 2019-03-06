<template>
  <header id="main-header" class="fixed-top">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <router-link to="/news-feed" class="navbar-brand text-uppercase" id="main-logo">
          <h1>Gym Schedule</h1>
        </router-link>

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
          <router-link to="/messages" class="text-capitalize text-white mr-2 d-flex">
            <font-awesome-icon icon="comments" class="text-white mr-3" />
          </router-link>

          <router-link to="/plans" class="text-capitalize text-white mr-2 d-flex">
            <font-awesome-icon icon="file-alt" class="text-white mr-3" />
          </router-link>

          <router-link to="/calendar/full" class="text-capitalize text-white mr-2 d-flex">
            <font-awesome-icon icon="calendar-alt" class="text-white mr-4" />
          </router-link>

          <div class="avatar mr-2 d-flex align-items-start">
            <img :src="avatar" alt="" v-if="avatar" />

            <font-awesome-icon icon="user" v-else />
          </div>

          <a :href="profileLink" class="text-capitalize text-white mr-2 d-flex">
            <span v-text="fullName"></span>
          </a>

          <div class="dropdown">
            <div class="text-white dropdown-toggle">
              <font-awesome-icon icon="caret-down" />
            </div>

            <div class="dropdown-menu">
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

const namespaceAvatar: string = 'avatar'

@Component({
  components: {
  FontAwesomeIcon
  }
  })
export default class Navigation extends Vue {
  @Getter('avatar', { namespace: namespaceAvatar }) private avatar: any

private isLogin: boolean = false
private fullName!: string
private profileLink: string = ''

private mounted () {
    const self: any = this

    if (self.$session.exists()) {
      const username = self.$session.get('username')

      this.isLogin = true
      this.fullName = self.$session.get('name')
      this.profileLink = window.location.origin + `/profile/${username}`
    }
  }

  private logout () {
    const self: any = this

    self.$session.destroy()
    window.location.href = location.origin
    this.isLogin = false
  }
}
</script>
