<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-8 offset-md-2">
        <div class="profile">
          <h2>Personal Profile</h2>

          <form>
            <div class="form-group">
              <label for="profile-name">Full Name</label>

              <input id="profile-name" type="text" class="form-control" />
            </div>

            <div class="form-group">
              <label for="profile-email">Email</label>

              <input id="profile-email" type="text" class="form-control" disabled="disabled" />
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
              <label for="profile-height">Height</label>

              <input id="profile-height" type="text" class="form-control" />
            </div>

            <div class="form-group">
              <label for="profile-weight">Weight</label>

              <input id="profile-weight" type="text" class="form-control" />
            </div>

            <div class="form-group text-center">
              <button class="btn btn-md btn-success">
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
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'profile',

  components: { FontAwesomeIcon },

  data () {
    return {
    }
  },

  methods: {
  },

  created () {
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
