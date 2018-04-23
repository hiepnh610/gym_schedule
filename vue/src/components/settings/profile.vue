<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 offset-md-3">
        <div class="profile">
          <h2 class="text-center mb-5">Personal Profile</h2>

          <form>
            <div class="form-group">
              <label for="profile-name">Full Name</label>

              <input id="profile-name" type="text" class="form-control" v-model="userInfo.name" />
            </div>

            <div class="form-group">
              <label for="profile-email">Email</label>

              <input id="profile-email" type="text" class="form-control" disabled="disabled" v-model="userInfo.email" />
            </div>

            <div class="form-group">
              <label for="profile-birthday">Birthday</label>

              <input id="profile-birthday" type="text" class="form-control" />
            </div>

            <div class="form-group">
              <label for="profile-gender">Gender</label>

              <select id="profile-gender" class="form-control">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div class="form-group">
              <label for="profile-password">Password</label>

              <input id="profile-password" type="password" class="form-control" />
            </div>

            <div class="form-group">
              <label for="profile-height">Height(cm)</label>

              <input id="profile-height" type="text" class="form-control" />
            </div>

            <div class="form-group">
              <label for="profile-weight">Weight(kg)</label>

              <input id="profile-weight" type="text" class="form-control" />
            </div>

            <div class="form-group text-center">
              <button class="btn btn-md btn-success" @click.prevent="userUpdate(userInfo.id)">
                Update
                <font-awesome-icon icon="save" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'profile',

  components: { FontAwesomeIcon },

  data () {
    return {
      userInfo: {}
    }
  },

  methods: {
    userUpdate (id) {
      const params = {
        email: this.userInfo.email,
        fullName: this.userInfo.name
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
          email: response.data[0].email,
          id: response.data[0]._id,
          name: response.data[0].fullName
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

<style lang="scss" scoped>
  @import '../../assets/scss/variables.scss';
  @import '../../assets/scss/mixins.scss';

  .profile {
    @include translate(0, 25%);
  }
</style>
