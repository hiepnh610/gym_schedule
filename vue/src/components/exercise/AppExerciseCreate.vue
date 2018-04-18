<template>
  <div class="modal fade text-left" v-show="showBackgroundModal && showCreateExercise" :class="{ 'show animated bounceIn': showBackgroundModal && showCreateExercise }" :style="{ display: 'block' }">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-body">
          <h2 class="text-center m-b-25 text-success">Exercises</h2>

          <div class="form-group">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque pariatur, quaerat ad. Atque at ipsa, eos delectus maxime, reiciendis quidem accusamus nemo quasi tempora officia, corrupti eum incidunt. Velit, numquam!</div>

          <div class="form-group text-center m-b-0 aligh-center">
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

<style lang="scss"></style>
