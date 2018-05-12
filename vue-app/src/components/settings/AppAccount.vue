<template>
  <div class="account">
    <h2 class="mb-5">Change password</h2>

    <form>
      <div class="form-group">
        <label for="profile-old-password">Old password</label>

        <input id="profile-old-password" type="password" class="form-control" v-model="userInfo.old_password" />
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
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'AppAccount',

  components: { FontAwesomeIcon },

  data () {
    return {
      userInfo: {}
    }
  }
}
</script>

<style lang="scss">
</style>
