<template>
  <div class="profile">
    <div class="row">
      <div class="col-xs-12 col-md-8">
        <h2>Personal Profile</h2>

        <hr />

        <form>
          <div class="form-group">
            <label for="profile-email">Email</label>

            <input id="profile-email" type="text" class="form-control" disabled="disabled" v-model="user.email" />
          </div>

          <div class="form-group">
            <label for="profile-name">Full Name</label>

            <input id="profile-name" type="text" class="form-control" v-model="user.fullName" />
          </div>

          <div class="form-group">
            <label for="profile-birthday">Birthday</label>

            <datepicker id="profile-birthday" input-class="form-control" :format="customFormatter" v-model="user.dob"></datepicker>
          </div>

          <div class="form-group">
            <label for="profile-gender">Gender</label>

            <select id="profile-gender" class="form-control" v-model="user.gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div class="form-group">
            <label for="profile-height">Height(cm)</label>

            <input id="profile-height" type="text" class="form-control" v-model.number="user.height" />
          </div>

          <div class="form-group">
            <label for="profile-weight">Weight(kg)</label>

            <input id="profile-weight" type="text" class="form-control" v-model.number="user.weight" />
          </div>

          <div class="form-group">
            <button class="btn btn-md btn-success" @click.prevent="userUpdate(user._id)">
              Update profile
              <font-awesome-icon icon="save" v-if="!updateInfoIsLoading" />
              <font-awesome-icon icon="spinner" spin v-if="updateInfoIsLoading" />
            </button>
          </div>

          <p v-show="message" class="text-white">{{ message }}</p>
        </form>
      </div>

      <div class="col-xs-12 col-md-4">
        <h6>Profile picture</h6>
        <div>
          <img :src="getAvatar" alt="" class="rounded border mb-3" v-if="getAvatar" />

          <img src="@/assets/images/avatar-default.png" alt="" class="rounded border mb-3" v-else />
        </div>

        <label for="upload-avatar" class="btn btn-block btn-secondary upload-avatar-label">
          Upload new picture
          <input id="upload-avatar" type="file" @change="selectImage" ref="inputFile" accept=".jpg, .jpeg, .png" />
        </label>

        <p v-if="errorAvatar" class="text-danger small text-center">{{ errorAvatar }}</p>
      </div>
    </div>

    <div class="modal modal-success modal-xs fade" v-show="showAvatarModal" :class="{ 'show animated bounceIn': showAvatarModal }" :style="{ display: 'block' }">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body text-center">
            <img :src="avatarPathFake" alt="" />
          </div>

          <div class="modal-footer">
            <a href="" class="btn btn-md btn-success" @click.prevent="uploadAvatar">
              Save
              <font-awesome-icon icon="spinner" spin v-if="updateAvatarIsLoading" />
            </a>
            <a href="" class="btn btn-md btn-light" @click.prevent="closeModal">Close</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from '@/config'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import Datepicker from 'vuejs-datepicker'
  import moment from 'moment'

  export default {
    name: 'profile',

    components: { FontAwesomeIcon, Datepicker },

    data () {
      return {
        avatarPathFake: '',
        avatarValue: null,
        errorAvatar: '',
        message: '',
        showAvatarModal: false,
        updateAvatarIsLoading: false,
        updateInfoIsLoading: false,
        user: {}
      }
    },

    methods: {
      userUpdate (id) {
        const formatTimeToUTC = moment.utc(this.user.dob).format()
        const params = this.user

        if (this.user.dob) {
          params.dob = formatTimeToUTC
        }

        this.updateInfoIsLoading = true

        axios
          .put(config.domainAddress + config.api.user + id, params)
          .then(function () {
            this.updateInfoIsLoading = false
            this.$toasted.success('Update Successfully!!!')
          }.bind(this))
          .catch(function (error) {
            if (error.response && error.response.data && error.response.data.message) {
              this.message = 'Error happened.'
            }

            this.updateInfoIsLoading = false
            this.$toasted.error('Error happened!!!')
          }.bind(this))
      },

      customFormatter (date) {
        return moment(date).format('DD/MM/YYYY')
      },

      selectImage (e) {
        this.avatarValue = e.target.files[0]

        const limitSize = 1024000
        const imageType = this.avatarValue.type.replace('image/', '')

        this.$refs.inputFile.value = ''
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
        this.$store.dispatch('setShowBackgroundModal', true)
        this.showAvatarModal = true
      },

      closeModal () {
        this.$store.dispatch('setShowBackgroundModal', false)
        this.showAvatarModal = false
      },

      uploadAvatar () {
        const configHeader = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }

        let formData = new FormData()
        formData.append('avatar', this.avatarValue)
        formData.append('userId', this.$session.getAll().id)

        this.updateAvatarIsLoading = true

        axios
          .post(config.domainAddress + config.api.upload, formData, configHeader)
          .then(function (response) {
            this.$store.dispatch('setAvatar', response.data.avatar.location)
            this.updateAvatarIsLoading = false
            this.showAvatarModal = false

            this.$store.dispatch('setShowBackgroundModal', false)
            this.$toasted.success('Upload Successfully!!!')
          }.bind(this))
          .catch(function (error) {
            if (error.response && error.response.data && error.response.data.message) {
              this.message = 'Error happened.'
            }

            this.updateAvatarIsLoading = false
            this.showAvatarModal = false

            this.$store.dispatch('setShowBackgroundModal', false)
            this.$toasted.error('Error happened!!!')
          }.bind(this))
      }
    },

    created () {
      axios
        .get(config.domainAddress + config.api.user, {
          params: {
            id: this.$session.get('id')
          }
        })
        .then(function (response) {
          this.user = response.data
        }.bind(this))
        .catch(function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            this.message = error.response.data.message
          } else {
            this.message = 'Error happened.'
          }
        }.bind(this))
    },

    computed: {
      getAvatar () {
        return this.$store.getters.avatar
      }
    }
  }
</script>

<style lang="scss" scoped>
  .upload-avatar-label {
    cursor: pointer;
    position: relative;
  }

  #upload-avatar {
    bottom: 0;
    cursor: pointer;
    font-size: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 1;
  }
</style>
