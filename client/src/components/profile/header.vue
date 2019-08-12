<template>
  <header class="profile-header">
    <div class="cover-photo">
      <div class="upload-cover-photo px-2 py-1">
        <font-awesome-icon icon="camera" class="text-muted mr-2" />

        <small>Update cover photo</small>
      </div>
    </div>

    <h2 class="profile-full-name">{{ userProfile.full_name }}</h2>

    <div class="btn-group" v-if="!isOwner">
      <a href="#" class="btn btn-sm btn-light mr-2" @click.prevent="follow" v-if="!following">
        <font-awesome-icon icon="user-plus" class="mr-1" />

        Follow
      </a>

      <a href="#" class="btn btn-sm btn-light mr-2" @click.prevent="unFollow" v-else>
        <font-awesome-icon icon="check" class="mr-1" />

        Following
      </a>

      <router-link :to="username" class="btn btn-sm btn-light mr-2">
        <font-awesome-icon icon="comments" class="mr-1" />
        Messages
      </router-link>
    </div>

    <nav class="nav">
      <router-link :to="{ name: 'TimelineProfile' }" class="nav-link">Timeline</router-link>

      <router-link :to="{ name: 'PhotoProfile' }" class="nav-link">Photos</router-link>

      <router-link :to="{ name: 'CalendarProfile' }" class="nav-link">Calendar</router-link>

      <router-link :to="{ name: 'PlansProfile' }" class="nav-link">Plans</router-link>

      <router-link :to="{ name: 'Following' }" class="nav-link" v-if="isOwner">
        Following
        <small v-if="userProfile && userProfile.following && userProfile.following.total > 0">({{ userProfile.following.total }})</small>
      </router-link>
    </nav>

    <div class="avatar">
      <div class="avatar-container">
        <img :src="avatar" alt="" v-if="avatar && isOwner" @click="openLightBox" />

        <img :src="userProfile.avatar" alt="" v-else-if="userProfile && userProfile.avatar && !isOwner" @click="openLightBox" />

        <img src="@/assets/images/avatar-default.png" alt="" v-else />

        <label for="upload-avatar" class="text-white text-center py-2" v-if="isOwner">
          <small>Upload new picture</small>

          <input id="upload-avatar" type="file" @change="selectImage" ref="inputFile" accept=".jpg, .jpeg, .png" />
        </label>
      </div>
    </div>

    <LightBox :images="listLightBoxImages" :showLightBox="false" ref="lightbox"></LightBox>

    <div class="modal fade" v-show="showAvatarModal" :class="{ 'show animated bounceIn': showAvatarModal }" :style="{ display: 'block' }">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body text-center">
            <img :src="avatarPathFake" alt="" />
          </div>

          <div class="modal-footer text-right">
            <button class="btn btn-sm btn-transparent m-0" @click.prevent="closeModal">Close</button>

            <button class="btn btn-sm btn-secondary m-0" @click.prevent="uploadAvatar">
              Save
              <font-awesome-icon icon="spinner" spin v-if="updateAvatarIsLoading" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import axios from 'axios'
import LightBox from 'vue-image-lightbox'

import config from '@/config'
import router from '@/router'
import { Response } from '@/util'

interface TypeUser {
  address?: string
  avatar?: string
  bio?: string
  dob?: string
  'full_name'?: string
}

interface TypeImage {
  url?: string
}

interface TypeLightBoxImage {
  src?: string
  thumb?: string
}

interface TypeParams {
  username: string
}

const namespaceAvatar: string = 'avatar'
const namespaceUser: string = 'user'
const namespaceModal: string = 'modal'

@Component({
  components: {
  LightBox
  }
  })
export default class ProfileHeader extends Vue {
  @Prop() private userProfile!: TypeUser
  @Prop() private isOwner!: boolean

  @Action('setAvatar', { namespace: namespaceAvatar }) private setAvatar: any
  @Getter('avatar', { namespace: namespaceAvatar }) private avatar: any

  @Getter('user', { namespace: namespaceUser }) private user: any

  @Action('setShowModalBackdrop', { namespace: namespaceModal }) private setShowModalBackdrop: any

  private avatarPathFake: string = ''
  private avatarValue: any = null
  private errorAvatar: string = ''
  private showAvatarModal: boolean = false
  private updateAvatarIsLoading: boolean = false
  private listLightBoxImages: TypeLightBoxImage[] = []
  private message: string = ''
  private following: boolean = false
  private username: string = ''

  private selectImage (e: any): void {
    const $this: any = this

    this.avatarValue = e.target.files[0]

    const limitSize: number = 1024000
    const imageType: string = this.avatarValue.type.replace('image/', '')

    $this.$refs.inputFile.value = ''
    this.errorAvatar = ''

    if (this.avatarValue.size > limitSize) {
      this.errorAvatar = 'Please upload a picture smaller than 1 MB.'
      return
    }

    if (imageType !== 'jpg' && imageType !== 'jpeg' && imageType !== 'png') {
      this.errorAvatar = 'We only support PNG or JPG pictures.'
      return
    }

    this.avatarPathFake = URL.createObjectURL(this.avatarValue)

    this.setShowModalBackdrop(true)
    this.showAvatarModal = true
  }

  private closeModal (): void {
    this.setShowModalBackdrop(false)
    this.showAvatarModal = false
  }

  private uploadAvatar (): void {
    const configHeader = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }

    const formData: any = new FormData()

    formData.append('image', this.avatarValue)
    formData.append('type', 'profile')

    this.updateAvatarIsLoading = true

    axios
      .post(config.api.upload, formData, configHeader)
      .then(function (response: Response) {
        this.setAvatar(response.data.avatar)
        this.setShowModalBackdrop(false)

        this.updateAvatarIsLoading = false
        this.showAvatarModal = false

        this.$toasted.success('Upload Successfully!!!')
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.$toasted.error(error.response.data.message)
        } else {
          this.$toasted.error('Error happened!!!')
        }

        this.updateAvatarIsLoading = false
        this.showAvatarModal = false

        this.setShowModalBackdrop(false)
      }.bind(this))
  }

  private openLightBox (): void {
    const lightBox: any = this.$refs.lightbox
    const params: TypeParams = {
      username: this.$route.params.user
    }

    axios
      .get(config.api.profileImages, { params })
      .then(function (response: Response) {
        if (response.data) {
          this.listLightBoxImages = response.data.map((item: TypeImage) => {
            return {
              src: item.url,
              thumb: item.url
            }
          })
        }
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }
      }.bind(this))

    lightBox.showImage(0)
  }

  private follow (): void {
    const username: string = this.$route.params.user

    axios
      .put(config.api.follow + username, {})
      .then(function (response: Response) {
        this.following = true
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.$toasted.error('Error happened!!!')
        }
      }.bind(this))
  }

  private unFollow (): void {
    const username: string = this.$route.params.user

    axios
      .put(config.api.unFollow + username, {})
      .then(function (response: Response) {
        this.following = false
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.$toasted.error('Error happened!!!')
        }
      }.bind(this))
  }

  private created (): void {
    this.username = `/messages/${this.$route.params.user}`

    for (const user of this.user.following) {
      if (user === this.$route.params.user) {
        this.following = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/elements/profile/_header.scss";
</style>
