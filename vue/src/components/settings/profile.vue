<template>
  <div class="profile">
    <div class="row">
      <div class="col-xs-12 col-md-8">
        <h4>Personal Profile</h4>

        <hr />

        <form>
          <div class="form-group input-group-lg">
            <label for="profile-email">Email</label>

            <input id="profile-email" type="text" class="form-control" disabled="disabled" v-model="user.email" />
          </div>

          <div class="form-group input-group-lg">
            <label for="profile-name">Full Name</label>

            <input id="profile-name" type="text" class="form-control" v-model="user.full_name" />
          </div>

          <div class="form-group input-group-lg">
            <label for="profile-birthday">Birthday</label>

            <div class="form-group-has-icon">
              <font-awesome-icon icon="calendar-alt" />

              <datepicker id="profile-birthday" input-class="form-control" :format="customFormatter" v-model="user.dob"></datepicker>
            </div>
          </div>

          <div class="form-group input-group-lg">
            <label for="profile-gender">Gender</label>

            <div class="form-group-has-icon">
              <font-awesome-icon icon="caret-down" />

              <select id="profile-gender" class="form-control px-4" v-model="user.gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div class="form-group input-group-lg">
            <label for="profile-height">Height(cm)</label>

            <input id="profile-height" type="text" class="form-control" v-model.number="user.height" />
          </div>

          <div class="form-group input-group-lg">
            <label for="profile-weight">Weight(kg)</label>

            <input id="profile-weight" type="text" class="form-control" v-model.number="user.weight" />
          </div>

          <div class="form-group input-group-lg">
            <label for="profile-address">Address</label>

            <input id="profile-address" type="text" class="form-control" v-model.number="user.address" />
          </div>

          <div class="form-group input-group-lg">
            <label for="profile-bio">Bio</label>

            <textarea-autosize
              id="profile-bio"
              class="form-control"
              :min-height="100"
              :max-height="300"
              v-model="user.bio" />
          </div>

          <div class="form-group">
            <button class="btn btn-md btn-primary" @click.prevent="userUpdate(user._id)">
              Update profile
              <font-awesome-icon icon="spinner" spin v-if="updateInfoIsLoading" />
            </button>
          </div>

          <p v-show="message" class="text-white">{{ message }}</p>
        </form>
      </div>

      <div class="col-xs-12 col-md-4">
        <h6>Profile picture</h6>

        <div class="profile-avatar">
          <div>
            <img :src="avatar" alt="" v-if="avatar" />

            <img src="@/assets/images/avatar-default.png" alt="" v-else />
          </div>

          <label for="upload-avatar" class="text-white text-center py-3">
            Upload new picture
            <input id="upload-avatar" type="file" @change="selectImage" ref="inputFile" accept=".jpg, .jpeg, .png" />
          </label>
        </div>

        <p v-if="errorAvatar" class="text-danger small text-center">{{ errorAvatar }}</p>
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

const namespaceModal: string = 'modal'
const namespaceAvatar: string = 'avatar'
const namespaceUser: string = 'user'

@Component({
  components: {
  FontAwesomeIcon,
  Datepicker
  }
  })
export default class Profile extends Vue {
  @Action('setShowModalBackdrop', { namespace: namespaceModal }) private setShowModalBackdrop: any

  @Action('setAvatar', { namespace: namespaceAvatar }) private setAvatar: any
  @Getter('avatar', { namespace: namespaceAvatar }) private avatar: any

  @Getter('user', { namespace: namespaceUser }) private user: any

  private avatarPathFake: string = ''
  private avatarValue: any = null
  private errorAvatar: string = ''
  private message: string = ''
  private showAvatarModal: boolean = false
  private updateAvatarIsLoading: boolean = false
  private updateInfoIsLoading: boolean = false

  private userUpdate (id: string) {
    const formatTimeToUTC = moment.utc(this.user.dob).format()
    const params = this.user

    if (this.user.dob) {
      params.dob = formatTimeToUTC
    }

    this.updateInfoIsLoading = true

    axios
      .put(config.api.user + id, params)
      .then(function () {
        this.updateInfoIsLoading = false
        this.$toasted.success('Update Successfully!!!')
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = 'Error happened.'
        }

        this.updateInfoIsLoading = false
        this.$toasted.error('Error happened!!!')
      }.bind(this))
  }

  private customFormatter (date: string) {
    return moment(date).format('DD/MM/YYYY')
  }

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

    formData.append('avatar', this.avatarValue)
    formData.append('userId', this.user._id)

    this.updateAvatarIsLoading = true

    axios
      .post(config.api.upload, formData, configHeader)
      .then(function (response: Response) {
        this.setAvatar(response.data.avatar.location)
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
