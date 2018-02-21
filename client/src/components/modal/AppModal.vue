<template>
  <div class="modal modal-success modal-xs fade" v-show="isSuccess" :class="{ 'in animated bounceIn': isSuccess }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body text-center">
          <i class="fa fa-check-circle text-primary" aria-hidden="true"></i>

          <h2>Welcome!</h2>

          <p v-if="isSignUp">You have signed up successfully.</p>
        </div>

        <div class="modal-footer">
          <a href="dashboard" class="btn btn-md btn-block btn-primary text-uppercase">ok</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal',
  props: ['isSuccess', 'isSignUp'],
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
