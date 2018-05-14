<template>
  <div class="profile">
    <h2 class="mb-5">Personal Profile</h2>

    <form>
      <div class="form-group">
        <label for="profile-email">Email</label>

        <input id="profile-email" type="text" class="form-control" disabled="disabled" v-model="userInfo.email" />
      </div>

      <div class="form-group">
        <label for="profile-name">Full Name</label>

        <input id="profile-name" type="text" class="form-control" v-model="userInfo.name" />
      </div>

      <div class="form-group">
        <label for="profile-birthday">Birthday</label>

        <input id="profile-birthday" type="text" class="form-control" />
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
        <button class="btn btn-md btn-success" @click.prevent="userUpdate(userInfo.id)">
          Update
          <font-awesome-icon icon="save" />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'AppProfile',

  components: { FontAwesomeIcon },

  data () {
    return {
      userInfo: {}
    }
  },

  methods: {
    userUpdate (id) {
      const params = {
        fullName: this.userInfo.name,
        gender: this.userInfo.gender,
        height: this.userInfo.height,
        weight: this.userInfo.weight
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
        this.userInfo = {
          email: response.data.email,
          gender: response.data.gender,
          height: response.data.height,
          id: response.data._id,
          name: response.data.fullName,
          weight: response.data.weight
        }
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

<style lang="scss">
</style>
