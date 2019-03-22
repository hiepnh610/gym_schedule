<template>
  <div id="profile" v-if="!isLoading">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <profile-header :userProfile="userProfile" :isOwner="isOwner" />
        </div>

        <div class="col-12 col-md-4">
          <profile-sidebar :userProfile="userProfile" />
        </div>

        <div class="col-12 col-md-8">
          <profile-content :full-name="fullName" :avatar="avatar" :isOwner="isOwner" />
        </div>
      </div>
    </div>
  </div>

  <loading v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import axios from 'axios'

import config from '@/config'
import { Response, ID, setLoading } from '@/util'

import profileHeader from '@/components/profile/header.vue'
import profileSidebar from '@/components/profile/sidebar.vue'
import profileContent from '@/components/profile/content.vue'
import Loading from '@/components/loading/loading.vue'

const namespaceUser: string = 'user'

interface TypeParams {
  username: string
}

interface TypeUser {
  address?: string
  avatar?: string
  bio?: string
  dob?: string
  'full_name'?: string
}

@Component({
  components: {
  profileHeader,
  profileSidebar,
  profileContent,
  Loading
  }
  })
export default class Profile extends Vue {
  @Getter('user', { namespace: namespaceUser }) private user: any

  private isLoading: boolean = true
  private userProfile: TypeUser = {}
  private isOwner: boolean = false
  private fullName: string = ''
  private avatar: string = ''

  private getUserProfile (): void {
    const usernameFromUrl: string = window.location.pathname.replace('/profile/', '').replace('/', '')
    const usernameFromLocal: string = this.user.username

    if (usernameFromLocal === usernameFromUrl) {
      this.isOwner = true
    }

    const params: TypeParams = {
      username: usernameFromUrl
    }

    axios
      .get(config.api.profile, { params })
      .then(function (response: Response) {
        this.userProfile = response.data
        this.fullName = response.data.full_name
        this.avatar = response.data.avatar

        setLoading(this, false)
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }
      }.bind(this))
  }

  @Watch('$route', { immediate: true, deep: true })
  private urlChanged () {
    this.getUserProfile()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/_profile.scss";
</style>
