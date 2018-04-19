<template>
  <div class="modal modal-success modal-xs fade" v-show="isSuccess" :class="{ 'show animated bounceIn': isSuccess }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body text-center">
          <div class="text-success mb-3">
            <font-awesome-icon icon="check-circle" />
          </div>

          <h2>Welcome!</h2>

          <p v-if="isSignUp">You have signed up successfully.</p>
        </div>

        <div class="modal-footer">
          <a href="/dashboard/plan" class="btn btn-md btn-block btn-success text-uppercase">ok</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'AppModal',

  components: { FontAwesomeIcon },

  props: ['isSuccess', 'isSignUp'],

  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';

svg {
  font-size: $size-base * 4;
}
</style>
