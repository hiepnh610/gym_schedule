<template>
  <div class="profile">
    <div class="row">
      <div class="col-xs-12 col-md-8">
        <h2>Personal Profile</h2>

        <hr />

        <form>
          <div class="form-group">
            <label for="profile-email">Email</label>

            <input id="profile-email" type="text" class="form-control" disabled="disabled" v-model="userInfo.email" />
          </div>

          <div class="form-group">
            <label for="profile-name">Full Name</label>

            <input id="profile-name" type="text" class="form-control" v-model="userInfo.fullName" />
          </div>

          <div class="form-group">
            <label for="profile-birthday">Birthday</label>

            <datepicker id="profile-birthday" input-class="form-control" :format="customFormatter" v-model="userInfo.dob"></datepicker>
          </div>

          <div class="form-group">
            <label for="profile-gender">Gender</label>

            <select id="profile-gender" class="form-control" v-model="userInfo.gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div class="form-group">
            <label for="profile-height">Height(cm)</label>

            <input id="profile-height" type="text" class="form-control" v-model="userInfo.height" />
          </div>

          <div class="form-group">
            <label for="profile-weight">Weight(kg)</label>

            <input id="profile-weight" type="text" class="form-control" v-model="userInfo.weight" />
          </div>

          <div class="form-group">
            <button class="btn btn-md btn-success" @click.prevent="userUpdate(userInfo._id)">
              Update profile
              <font-awesome-icon icon="save" />
            </button>
          </div>
        </form>
      </div>

      <div class="col-xs-12 col-md-4">
        <h6>Profile picture</h6>
        <img :src="userInfo.avatar" alt="" class="rounded border mb-3" />

        <label for="upload-avatar" class="btn btn-block btn-secondary upload-avatar-label">
          Upload new picture
          <input id="upload-avatar" type="file" @change="uploadAvatar" ref="uploadAvatar" />
        </label>

        <p v-if="showMessage" class="text-danger small text-center">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'

export default {
  name: 'AppProfile',

  components: { FontAwesomeIcon, Datepicker },

  data () {
    return {
      userInfo: {},
      message: '',
      showMessage: false
    }
  },

  methods: {
    userUpdate (id) {
      const formatTimeToUTC = moment.utc(this.userInfo.dob).format()
      const params = this.userInfo

      if (this.userInfo.dob) {
        params.dob = formatTimeToUTC
      }

      axios
        .put(config.domainAddress + config.api.user + id, params)
        .then(function () {
          this.$toasted.success('Update Successfully!!!')
        }.bind(this))
        .catch(function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            this.errContent = error.response.data.message
          } else {
            this.errContent = 'Error happened.'
          }

          this.$toasted.error('Error happened!!!')
        }.bind(this))
    },

    customFormatter (date) {
      return moment(date).format('DD/MM/YYYY')
    },

    uploadAvatar (e) {
      const imageValue = e.target.files[0]
      const limitSize = 1024000
      const imageType = imageValue.type.replace('image/', '')

      this.$refs.uploadAvatar.value = ''
      this.message = ''

      if (imageValue.size > limitSize) {
        this.message = 'Please upload a picture smaller than 1 MB.'
        this.showMessage = true
      }

      if (imageType !== 'jpg' && imageType !== 'jpeg' && imageType !== 'png') {
        this.message = 'We only support PNG or JPG pictures.'
        this.showMessage = true
      }
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
        this.userInfo = response.data
      }.bind(this))
      .catch(function (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errContent = error.response.data.message
        } else {
          this.errContent = 'Error happened.'
        }
      }.bind(this))
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
