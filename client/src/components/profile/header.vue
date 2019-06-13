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
      <div class="btn btn-sm btn-light mr-2">
        <font-awesome-icon icon="user-plus" class="mr-1" />
        Follow
      </div>

      <div class="btn btn-sm btn-light mr-2">
        <font-awesome-icon icon="comments" class="mr-1" />
        Messages
      </div>
    </div>

    <nav class="nav">
      <router-link :to="{ name: 'TimelineProfile' }" class="nav-link">Timeline</router-link>

      <router-link :to="{ name: 'PhotoProfile' }" class="nav-link">Photos</router-link>

      <router-link :to="{ name: 'CalendarProfile' }" class="nav-link">Calendar</router-link>

      <router-link :to="{ name: 'PlansProfile' }" class="nav-link">Plans</router-link>
    </nav>

    <div class="avatar">
      <div class="avatar-container">
        <img :src="avatar" alt="" v-if="avatar && isOwner" />

        <img :src="userProfile.avatar" alt="" v-else-if="userProfile && userProfile.avatar && !isOwner" />

        <img src="@/assets/images/avatar-default.png" alt="" v-else />

        <label for="upload-avatar" class="text-white text-center py-2" v-if="isOwner">
          <small>Upload new picture</small>

          <input id="upload-avatar" type="file" @change="selectImage" ref="inputFile" accept=".jpg, .jpeg, .png" />
        </label>
      </div>
    </div>

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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

interface TypeUser {
  address?: string
  avatar?: string
  bio?: string
  dob?: string
  'full_name'?: string
}

const namespaceAvatar: string = 'avatar'
const namespaceUser: string = 'user'
const namespaceModal: string = 'modal'

@Component({
  components: {
  FontAwesomeIcon
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

  private selectImage (e: any) {
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

  private closeModal () {
    this.setShowModalBackdrop(false)
    this.showAvatarModal = false
  }

  private uploadAvatar () {
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
          this.message = 'Error happened.'
        }

        this.updateAvatarIsLoading = false
        this.showAvatarModal = false

        this.setShowModalBackdrop(false)
        this.$toasted.error('Error happened!!!')
      }.bind(this))
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/elements/profile/_header.scss";
</style>
