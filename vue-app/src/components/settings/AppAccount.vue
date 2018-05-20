<template>
  <div class="account">
    <div class="row">
      <div class="col-12 col-md-8">
        <h2>Change password</h2>

        <hr />

        <form>
          <div class="form-group">
            <label for="profile-old-password">Old password</label>

            <input id="profile-old-password" type="password" class="form-control" v-model="userInfo.current_password" />
          </div>

          <div class="form-group">
            <label for="profile-new-password">New password</label>

            <input id="profile-new-password" type="password" class="form-control" v-model="userInfo.new_password" />
          </div>

          <div class="form-group">
            <label for="profile-confirm-new-password">Confirm new password</label>

            <input id="profile-confirm-new-password" type="password" class="form-control" v-model="userInfo.confirm_new_password" />
          </div>

          <div class="form-group">
            <button class="btn btn-md btn-success" @click.prevent="userUpdate(userInfo.id)">
              Update password
              <font-awesome-icon icon="save" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'AppAccount',

  components: { FontAwesomeIcon },

  data () {
    return {
      userInfo: {
        id: this.$session.get('id')
      }
    }
  },

  methods: {
    userUpdate (id) {
      if (this.userInfo.new_password === this.userInfo.confirm_new_password) {
        const params = {
          current_password: this.userInfo.current_password,
          new_password: this.userInfo.new_password
        }

        axios
          .put(config.domainAddress + config.api.modifyPassword + id, params)
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
      } else {
        this.$toasted.error('The password does not match.')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
@import '../../assets/scss/mixins.scss';

hr {
  border-color: $hr-border-color;
}
</style>
