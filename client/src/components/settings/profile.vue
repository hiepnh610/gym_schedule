<template>
  <div class="profile px-4 pt-4 bg-white border border-radius">
    <h4>Personal Profile</h4>

    <hr />

    <form>
      <div class="form-group input-group-lg">
        <label for="profile-email">Email</label>

        <input id="profile-email" type="text" class="form-control" disabled="disabled" v-model="userInfo.email" />
      </div>

      <div class="form-group input-group-lg">
        <label for="profile-name">Full Name</label>

        <input id="profile-name" type="text" class="form-control" v-model="userInfo.full_name" />
      </div>

      <div class="form-group input-group-lg">
        <label for="profile-birthday">Birthday</label>

        <div class="form-group-has-icon">
          <font-awesome-icon icon="calendar-alt" />

          <datepicker id="profile-birthday" input-class="form-control" :format="customFormatter" v-model="userInfo.dob"></datepicker>
        </div>
      </div>

      <div class="form-group input-group-lg">
        <label for="profile-gender">Gender</label>

        <div class="form-group-has-icon">
          <font-awesome-icon icon="caret-down" />

          <select id="profile-gender" class="form-control px-4" v-model="userInfo.gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      <div class="form-group input-group-lg">
        <label for="profile-height">Height(cm)</label>

        <input id="profile-height" type="text" class="form-control" v-model.number="userInfo.height" />
      </div>

      <div class="form-group input-group-lg">
        <label for="profile-weight">Weight(kg)</label>

        <input id="profile-weight" type="text" class="form-control" v-model.number="userInfo.weight" />
      </div>

      <div class="form-group input-group-lg">
        <label for="profile-address">Address</label>

        <input id="profile-address" type="text" class="form-control" v-model.number="userInfo.address" />
      </div>

      <div class="form-group input-group-lg">
        <label for="profile-bio">Bio</label>

        <textarea-autosize
          id="profile-bio"
          class="form-control"
          :min-height="100"
          :max-height="300"
          v-model="userInfo.bio" />
      </div>

      <div class="form-group">
        <button class="btn btn-md btn-primary" @click.prevent="userUpdate(userInfo._id)">
          Update profile
          <font-awesome-icon icon="spinner" spin v-if="updateInfoIsLoading" />
        </button>
      </div>

      <p v-show="message" class="text-white">{{ message }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'
import axios from 'axios'
import cloneDeep from 'lodash/cloneDeep'

import config from '@/config'
import { Response } from '@/util'

interface TypeUserInfo {
  address: string
  dob: string
  email: string
  full_name: string
  gender: string
  height?: number
  weight?: number
}

const namespaceUser: string = 'user'

@Component({
  components: {
  Datepicker
  }
  })
export default class Profile extends Vue {
  @Getter('user', { namespace: namespaceUser }) private user: any

  private message: string = ''
  private updateInfoIsLoading: boolean = false
  private userInfo: TypeUserInfo = {
    address: '',
    dob: '',
    email: '',
    full_name: '',
    gender: ''
  }

  private userUpdate () {
    const formatTimeToUTC = moment.utc(this.userInfo.dob).format()
    const params = this.userInfo

    if (this.userInfo.dob) {
      params.dob = formatTimeToUTC
    }

    this.updateInfoIsLoading = true

    axios
      .put(config.api.user, params)
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

  @Watch('user', { immediate: true, deep: true })
  private getUserInfo (val: any) {
    this.userInfo = cloneDeep(val)
  }
}
</script>
