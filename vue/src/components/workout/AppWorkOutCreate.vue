<template>
  <div class="modal modal-xs fade text-left" v-show="showBackgroundModal && showCreatePlan" :class="{ 'in animated bounceIn': showBackgroundModal && showCreatePlan }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="name-workout">Workout Day Name</label>

              <input type="text" id="name-workout" class="form-control" />
            </div>

            <div class="form-group">
              <label for="workout-day">Pick a Workout Day</label>

              <select id="workout-day" class="form-control">
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>

            <div class="form-group text-center m-b-0">
              <button class="btn btn-md btn-primary text-uppercase">Submit</button>

              <button class="btn btn-md btn-default text-uppercase" @click.prevent="closeModal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppWorkOutCreate',
  components: {},
  data () {
    return {
      namePlan: ''
    }
  },
  methods: {
    closeModal () {
      this.$store.dispatch('setShowBackgroundModal', false)
    }
  },
  created () {
    this.namePlan = this.$store.getters.namePlan
  },
  computed: {
    showBackgroundModal () {
      return this.$store.getters.showBackgroundModal
    },
    showCreatePlan () {
      return this.$store.getters.showCreateModal
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
@import '../../assets/scss/mixins.scss';
  h1 {
    margin-bottom: $size-base * 20;
  }
</style>
