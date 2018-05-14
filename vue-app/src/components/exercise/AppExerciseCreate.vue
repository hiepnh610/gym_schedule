<template>
  <div class="modal fade text-left" v-show="showBackgroundModal && showCreateExercise" :class="{ 'show animated bounceIn': showBackgroundModal && showCreateExercise }" :style="{ display: 'block' }">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-body">
          <h2 class="text-center text-success">Exercises</h2>

          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <div class="d-flex">
                <img src="http://via.placeholder.com/75x75" class="rounded-0" />

                <div class="body"> Benchpress with Barbell (Flat)</div>
              </div>
            </li>
          </ul>

          <div class="form-group text-center mb-0 aligh-center">
            <button href="dashboard" class="btn btn-md btn-secondary" @click.prevent="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppExerciseCreate',

  data () {
    return {
    }
  },

  methods: {
    closeModal () {
      this.$store.dispatch('setShowBackgroundModal', false)
    }
  },

  computed: {
    showBackgroundModal () {
      return this.$store.getters.showBackgroundModal
    },

    showCreateExercise () {
      return this.$store.getters.showCreateModal
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variables.scss';
  @import '../../assets/scss/mixins.scss';

  .list-group {
    max-height: 60vh;
    margin-bottom: $size-base;
    overflow-x: hidden;
    overflow-y: scroll;

    .list-group-item {
      cursor: pointer;
      padding-left: 0;
      padding-right: 0;

      img {
        margin-right: $size-base;
      }
    }
  }
</style>
